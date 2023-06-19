import { FindOptions, Op, Transaction } from 'sequelize';
import { TeacherInterface } from '../../interface/TeacherInterface';
import { UserRole } from '../../interface/UserInterface';
import { ITeacherRepository } from '../../repository/TeacherRepository';
import { TeachersModel } from '../model/TeachersModel';
import { RestError } from '../../services/error/error';
import { CampusModel } from '../model/CampusModel';
import { UsersModel } from '../model/UsersModel';

export class TeacherSequelize implements ITeacherRepository {
  async findAllLists(type: string, campusId?: number, userId?: number): Promise<TeacherInterface[]> {
    const options: FindOptions<TeachersModel> = {
      where: {
        ...(type && { type }),
        ...(campusId && { campusId }),
        [Op.not]: {
          userId
        }
      },
      include: [
        { model: CampusModel, as: 'campus' },
        { model: UsersModel, as: 'users' }
      ]
    };

    const teachers = await TeachersModel.findAll(options);
    const transformedData: TeacherInterface[] | any[] = teachers.map((item) => {
      const { campus, users, ...teacherData } = item.toJSON();
      return {
        ...teacherData,
        campusName: campus.name,
        userName: users.userName
      };
    });
    return transformedData;
  }

  async findById(campusId: number, teacherId: number): Promise<TeacherInterface> {
    const teacher = await TeachersModel.findByPk(teacherId);
    if (teacher.campusId !== campusId) return;
    return this.transformModelToEntity(teacher);
  }

  async findByUserId(userId: number): Promise<TeacherInterface> {
    const teacher = await TeachersModel.findOne({ where: { userId } });
    return this.transformModelToEntity(teacher);
  }

  async createTeacher(reqBody: TeacherInterface, userId: number, transactionDb: Transaction): Promise<TeacherInterface> {
    const { name, email, gender, dateOfBirth, startDate, country, timeZone, resignation, campusId, talkSamId, role, type, memo, password } = reqBody;
    const teacher = await TeachersModel.create(
      { name, email, gender, dateOfBirth, startDate, country, timeZone, resignation, campusId, talkSamId, role, type, memo, password, userId },
      transactionDb && { transaction: transactionDb }
    );
    return this.transformModelToEntity(teacher);
  }

  async updateTeacher(reqBody: TeacherInterface): Promise<void> {
    const { teacherId, name, activate, startDate, gender, dateOfBirth, country, timeZone, resignation, campusId, talkSamId, role, type, memo, password } = reqBody;
    let teacher = await TeachersModel.findByPk(teacherId);
    if (!teacher) {
      throw new RestError('teacher not found!', 404);
    }
    teacher.name = name;
    teacher.gender = gender;
    teacher.dateOfBirth = dateOfBirth;
    teacher.startDate = startDate;
    teacher.country = country;
    teacher.timeZone = timeZone;
    teacher.resignation = resignation;
    teacher.talkSamId = talkSamId;
    teacher.role = role;
    teacher.type = type;
    teacher.memo = memo;
    teacher.activate = activate;
    if (teacher.password !== password) {
      teacher.password = password;
    }
    await teacher.save();
    return;
  }

  async updateMultiActivateTeacher(teacherId: number): Promise<void> {
    await TeachersModel.update({ activate: false }, { where: { teacherId } });
    return;
  }
  /**
   * Transforms database model into domain entity
   * @param model
   */
  private transformModelToEntity(model: TeachersModel): TeacherInterface {
    if (!model) return;
    const entity: any = {};
    const keysObj = Object.keys(model.dataValues);
    for (let key of keysObj) {
      entity[key] = model[key];
    }
    return entity;
  }
}
