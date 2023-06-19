import { Transaction } from 'sequelize';
import { RestError } from '../../services/error/error';
import { UsersModel } from '../model/UsersModel';
import { IStudentRepository } from '../../repository/StudentRepository';
import { StudentInterface } from '../../interface/StudentInterface';
import { StudentsModel } from '../model/StudentsModel';

export class StudentSequelize implements IStudentRepository {
  async findAllListsByCampusId(campusId: number): Promise<StudentInterface[]> {
    const students = await StudentsModel.findAll({
      where: { campusId },
      include: [{ model: UsersModel, as: 'users' }]
    });

    const transformedData: StudentInterface[] | any[] = students.map((item) => {
      const { users, ...studentData } = item.toJSON();
      return {
        ...studentData,
        userName: users?.userName || null
      };
    });
    return transformedData;
  }

  async findById(studentId: number): Promise<StudentInterface> {
    const student = await StudentsModel.findByPk(studentId);
    return this.transformModelToEntity(student);
  }

  async findByUserId(userId: number): Promise<StudentInterface> {
    const student = await StudentsModel.findOne({ where: { userId } });
    return this.transformModelToEntity(student);
  }

  async createStudent(reqBody: StudentInterface, userId: number, campusId: number, transactionDb: Transaction): Promise<StudentInterface> {
    const { name, email, gender, dateOfBirth, country, timeZone, introduction, talkSamId, password } = reqBody;
    const student = await StudentsModel.create(
      { name, email, campusId, gender, dateOfBirth, country, timeZone, introduction, talkSamId, password, userId },
      transactionDb && { transaction: transactionDb }
    );
    return this.transformModelToEntity(student);
  }

  async updateStudent(reqBody: StudentInterface): Promise<void> {
    const { studentId, name, email, gender, dateOfBirth, country, timeZone, introduction, talkSamId, password, activate } = reqBody;
    let student = await StudentsModel.findByPk(studentId);
    if (!student) {
      throw new RestError('teacher not found!', 404);
    }
    student.name = name;
    student.gender = gender;
    student.dateOfBirth = dateOfBirth;
    student.email = email;
    student.country = country;
    student.timeZone = timeZone;
    student.talkSamId = talkSamId;
    student.introduction = introduction;
    student.activate = activate;
    if (student.password !== password) {
      student.password = password;
    }
    await student.save();
    return;
  }

  async updateMultiActivateStudent(studentId: number): Promise<void> {
    await StudentsModel.update({ activate: false }, { where: { studentId } });
    return;
  }
  /**
   * Transforms database model into domain entity
   * @param model
   */
  private transformModelToEntity(model: StudentsModel): StudentInterface {
    if (!model) return;
    const entity: any = {};
    const keysObj = Object.keys(model.dataValues);
    for (let key of keysObj) {
      entity[key] = model[key];
    }
    return entity;
  }
}
