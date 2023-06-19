import { ClassInterface, TypeClass } from '../interface/ClassInterface';
import { Transaction } from 'sequelize';
import { IClassRepository } from '../repository/ClassRepository';
import { IStudentManagementMatchActivityRepository } from '../repository/StudentManagementMatchActivityRepository';
import { ITeacherRepository } from '../repository/TeacherRepository';
import { ITeacherOfDateRepository } from '../repository/TeacherOfDateRepository';
import { IStudentMatchActivityRepository } from '../repository/StudentMatchActivityRepository';
import { RestError } from '../services/error/error';
import { IStudentRepository } from '../repository/StudentRepository';

export class ClassUserCase {
  constructor(
    private classRepository: IClassRepository,
    private studentManagementMatchActivityRepository: IStudentManagementMatchActivityRepository,
    private studentMatchActivityRepository: IStudentMatchActivityRepository,
    private teacherRepository: ITeacherRepository,
    private studentRepository: IStudentRepository,
    private teacherOfDateRepository: ITeacherOfDateRepository
  ) {}
  async registerClassOfflineUseCase(reqBody: ClassInterface, transactionDb: Transaction) {
    const { studentList } = reqBody;
    const classModel = await this.classRepository.createClass(reqBody, studentList.length, transactionDb);
    if (!classModel) throw new RestError('register failed!', 404);
    await Promise.all(
      studentList.map(async (item) => {
        await this.studentManagementMatchActivityRepository.updateStudentManagementActivity(
          { studentMnMActivityId: item.studentMnMActivityId, classId: classModel.classId, teacherId: classModel.teacherId, dateTimeSlot: reqBody.dateTimeSlot },
          transactionDb
        );
        await this.studentMatchActivityRepository.updateStudentProducts(
          { studentMnMActivityId: item.studentMnMActivityId, classId: classModel.classId, teacherId: classModel.teacherId },
          transactionDb
        );
      })
    );
  }

  async registerStudentInClassUseCase(reqBody: ClassInterface, transactionDb: Transaction) {
    const { classId, studentList } = reqBody;
    const classModel = await this.classRepository.findById(classId);
    if (!classModel) throw new RestError('class not available', 404);
    if (classModel.expired) throw new RestError('class not available', 404);
    if (classModel.numberOfStudent === classModel.availableNumStudent) throw new RestError('class is not student!', 404);
    await this.classRepository.updateAvailableNumStudent(classId, studentList.length, 'INCR', transactionDb);
    await Promise.all(
      studentList.map(async (item) => {
        await this.studentManagementMatchActivityRepository.updateStudentManagementActivity(
          { studentMnMActivityId: item.studentMnMActivityId, classId: classModel.classId, teacherId: classModel.teacherId, dateTimeSlot: reqBody.dateTimeSlot },
          transactionDb
        );
        await this.studentMatchActivityRepository.updateStudentProducts(
          { studentMnMActivityId: item.studentMnMActivityId, classId: classModel.classId, teacherId: classModel.teacherId },
          transactionDb
        );
      })
    );
  }

  async updateClassOfflineUseCase(reqBody: ClassInterface) {
    return;
  }

  async findStudentWithProductIdsUseCase(productIds: number[]) {
    return await this.studentManagementMatchActivityRepository.findByProductIdWithNoneClass(productIds);
  }

  async getStudentByIdClassOfflineUseCase(classId: number) {
    const classModel = await this.classRepository.findById(classId);
    if (!classModel.studentManagementMatchActivity.length) return classModel;
    let result = [];
    await Promise.all(
      classModel.studentManagementMatchActivity.map(async (item) => {
        const student = await this.studentRepository.findById(item.studentId);
        if (student) {
          result.push(student);
        }
      })
    );
    classModel.students = result;
    return classModel;
  }

  async getListClassOfflineUseCase(campusId: number) {
    return this.classRepository.findAllLists(campusId);
  }

  async checkTimeDuplicateStudentUseCase(studentIds: number[], dateTimeSlot: number[]) {
    let result = [];
    await Promise.all(
      studentIds.map(async (item) => {
        const find = await this.studentManagementMatchActivityRepository.findByStudentIdCheckDateTimeSlot(item, dateTimeSlot);
        if (find) {
          result.push(item);
        }
      })
    );
    return result.length ? result : null;
  }

  async getListTeacherOffUseCase(valuaBody: any) {
    const { userId, campusId, classStartDate, dateTimeSlot } = valuaBody;
    const teachers = await this.teacherRepository.findAllLists(TypeClass.OFFLINE, campusId, userId);
    if (!teachers || !teachers.length) return null;
    let resultTeacher = [];
    await Promise.all(
      teachers.map(async (item) => {
        const teacher = await this.classRepository.findTeacherInDate(item.teacherId, dateTimeSlot);
        if (teacher) {
          resultTeacher.push({ ...item, classStartDate, dateTimeSlot });
        }
      })
    );
    let result = [];
    const dateTimeSlotParse = dateTimeSlot.map((obj) => Object.values(obj)[0]);
    await Promise.all(
      resultTeacher.map(async (item) => {
        const isCheck = await this.getListTeacherDateOffUseCase(item.teacherId, classStartDate, dateTimeSlotParse);
        if (isCheck) {
          result.push({ teacherId: item.teacherId, userId: item.userId, campusId: item.campusId, name: item.name, email: item.email });
        }
      })
    );
    return result;
  }

  async getListTeacherDateOffUseCase(teacherId: number, classStartDate: Date, dateTimeSlot: number[]) {
    return await this.teacherOfDateRepository.findTeacherByDateOffTimeSlotId(teacherId, classStartDate, dateTimeSlot);
  }

  async removeStudentInClassUseCase(reqBody: ClassInterface, transactionDb: Transaction) {
    const { classId, studentIds } = reqBody;
    const find = await this.classRepository.findById(classId);
    if (!find) throw new RestError('class not available!', 404);
    if (find.expired) throw new RestError('the course class has ended!', 404);
    if (find.classStartDate < new Date()) throw new RestError('class in progress!', 404);
    if (!find.availableNumStudent) throw new RestError('class is not student!', 404);
    await this.classRepository.updateAvailableNumStudent(classId, studentIds.length, 'DECR', transactionDb);
    await Promise.all(
      studentIds.map(async (item) => {
        await this.studentManagementMatchActivityRepository.removeStudentInClass(item, classId, transactionDb);
        await this.studentMatchActivityRepository.removeStudentInClass(item, classId, transactionDb);
      })
    );
    return;
  }

  async getListClassByTeacherId(teacherId: number, campusId: number) {
    return await this.classRepository.getListClassByTeacherId(teacherId, campusId);
  }

  async getClassByTeacherId(classId: number, teacherId: number) {
    const classModel = await this.classRepository.findById(classId);
    if (!classModel || classModel.teacherId !== teacherId) {
      throw new RestError('class not available!', 404);
    }
    if (!classModel.studentManagementMatchActivity.length) return classModel;
    let result = [];
    await Promise.all(
      classModel.studentManagementMatchActivity.map(async (item) => {
        const student = await this.studentRepository.findById(item.studentId);
        if (student) {
          result.push(student);
        }
      })
    );
    classModel.students = result;
    return classModel;
  }
}
