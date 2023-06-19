import { Op } from 'sequelize';
import { TeacherOfDateInterface } from '../../interface/TeacherOfDateInterface';
import { ITeacherOfDateRepository } from '../../repository/TeacherOfDateRepository';
import { TeacherOffDatesModel } from '../model/TeacherOffDatesModel';

export class TeacherOfDateSequelize implements ITeacherOfDateRepository {
  async findAllLists(teacherId: number): Promise<TeacherOfDateInterface[]> {
    const teachers = await TeacherOffDatesModel.findAll({ where: { teacherId } });
    return teachers.map((item) => this.transformModelToEntity(item));
  }

  async findById(teacherId: number): Promise<TeacherOfDateInterface> {
    const teacher = await TeacherOffDatesModel.findOne({ where: { teacherId } });
    return this.transformModelToEntity(teacher);
  }

  async createTeacherOfDate(reqBody: TeacherOfDateInterface): Promise<void> {
    const { teacherId, dateOff, classTimeSlotId } = reqBody;
    await TeacherOffDatesModel.create({ teacherId, dateOff, classTimeSlotId });
    return;
  }

  async updateTeacherOfDate(reqBody: TeacherOfDateInterface): Promise<void> {
    const { teacherOffDateId, teacherId, dateOff, classTimeSlotId } = reqBody;
    await TeacherOffDatesModel.update({ teacherId, dateOff, classTimeSlotId }, { where: { teacherOffDateId } });
    return;
  }

  async deleteTeacherOfDate(teacherOffDateId: number): Promise<void> {
    let teacher = await TeacherOffDatesModel.findByPk(teacherOffDateId);
    if (!teacher) return;
    await teacher.destroy();
    return;
  }

  async findTeacherByDateOffTimeSlotId(teacherId: number, classStartDate: Date, classTimeSlotIds: number[]): Promise<boolean> {
    const findList = await TeacherOffDatesModel.findAll({
      where: {
        teacherId,
        dateOff: {
          [Op.gt]: classStartDate
        }
      }
    });

    let isCheck = true;
    for (const item of findList) {
      if (classTimeSlotIds.includes(item.classTimeSlotId)) {
        isCheck = false;
        break;
      }
    }
    return isCheck;
  }

  /**
   * Transforms database model into domain entity
   * @param model
   */
  private transformModelToEntity(model: TeacherOffDatesModel): TeacherOfDateInterface {
    if (!model) return;
    const entity: any = {};
    const keysObj = Object.keys(model.dataValues);
    for (let key of keysObj) {
      entity[key] = model[key];
    }
    return entity;
  }
}
