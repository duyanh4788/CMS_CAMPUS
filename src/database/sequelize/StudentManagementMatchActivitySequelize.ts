import { Op, Transaction } from 'sequelize';
import { StudentManagementMatchActivityInterface } from '../../interface/StudentManagementMatchActivityInterface';
import { StudentManagementMatchActivityModel } from '../model/StudentManagementMatchActivityModel';
import { IStudentManagementMatchActivityRepository } from '../../repository/StudentManagementMatchActivityRepository';
import { StudentMatchActivitysModel } from '../model/StudentMatchActivitysModel';
import { StudentsModel } from '../model/StudentsModel';
import { RestError } from '../../services/error/error';
import { validateTimeSlots } from '../../utils/handlerArray';

export class StudentManagementMatchActivitySequelize implements IStudentManagementMatchActivityRepository {
  async findAllListsByStudentId(studentId: number): Promise<StudentManagementMatchActivityInterface[]> {
    const studentProducts = await StudentManagementMatchActivityModel.findAll({ where: { studentId }, include: StudentMatchActivitysModel });
    return studentProducts.map((item) => this.transformModelToEntity(item));
  }
  async findById(studentMnMActivityId: number): Promise<StudentManagementMatchActivityInterface> {
    const productGroup = await StudentManagementMatchActivityModel.findOne({
      where: { studentMnMActivityId },
      include: [
        {
          model: StudentsModel,
          attributes: ['studentId', 'userId', 'name', 'email']
        }
      ]
    });
    return this.transformModelToEntity(productGroup);
  }

  async findByStudentIdCheckDateTimeSlot(studentId: number, dateTimeSlot: any[]): Promise<boolean> {
    const productGroup = await StudentManagementMatchActivityModel.findAll({
      where: {
        studentId,
        expired: false
      }
    });
    for (let item of productGroup) {
      if (item.dateTimeSlot) {
        if (!validateTimeSlots(JSON.parse(item.dateTimeSlot), dateTimeSlot)) {
          return false;
        }
      }
    }
    return true;
  }

  async findByStudentIdProductId(studentId: number, productIds: number[]): Promise<StudentManagementMatchActivityInterface | StudentManagementMatchActivityInterface[]> {
    const productGroup = await StudentManagementMatchActivityModel.findOne({ where: { studentId, productIds: JSON.stringify(productIds) } });
    return this.transformModelToEntity(productGroup);
  }

  async findByProductIdWithNoneClass(productIds: number[]): Promise<StudentManagementMatchActivityInterface[]> {
    const productGroups = await StudentManagementMatchActivityModel.findAll({
      where: {
        productIds: {
          [Op.like]: `%${JSON.stringify(productIds)}%`
        },
        classId: null
      },
      include: [
        {
          model: StudentsModel,
          attributes: ['studentId', 'userId', 'name', 'email']
        }
      ]
    });
    return productGroups.map((item) => this.transformModelToEntity(item));
  }

  async findByStudentIdProductIdClassId(studentId: number, productIds: number[], classId: number): Promise<StudentManagementMatchActivityInterface | StudentManagementMatchActivityInterface[]> {
    const productGroup = await StudentManagementMatchActivityModel.findOne({ where: { studentId, productIds: JSON.stringify(productIds), classId } });
    return this.transformModelToEntity(productGroup);
  }
  async createStudentManagementActivity(reqBody: any, studentId: number, transactionDb: Transaction): Promise<StudentManagementMatchActivityInterface> {
    const { productIds, campusId } = reqBody;
    const created = await StudentManagementMatchActivityModel.create({ studentId, productIds: JSON.stringify(productIds), campusId }, { transaction: transactionDb });
    return this.transformModelToEntity(created);
  }
  async updateStudentManagementActivity(reqBody: any, transactionDb: Transaction): Promise<void> {
    const { studentMnMActivityId, classId, dateTimeSlot, teacherId } = reqBody;
    const find = await StudentManagementMatchActivityModel.findByPk(studentMnMActivityId);
    if (find.classId) {
      throw new RestError(`student has register, please check again!`, 404);
    }
    find.classId = classId;
    find.teacherId = teacherId;
    find.dateTimeSlot = JSON.stringify(dateTimeSlot);
    await find.save({ transaction: transactionDb });
    return;
  }

  async updateProductIdsById(studentMnMActivityId: number, productIds: number[], transactionDb: Transaction): Promise<void> {
    await StudentManagementMatchActivityModel.update({ productIds: JSON.stringify(productIds) }, { where: { studentMnMActivityId }, transaction: transactionDb });
    return;
  }

  async deleteStudentManagementActivity(studentMnMActivityId: number): Promise<void> {
    await StudentManagementMatchActivityModel.destroy({ where: { studentMnMActivityId } });
    return;
  }

  async removeStudentInClass(studentId: number, classId: number, transactionDb: Transaction): Promise<void> {
    const find = await StudentManagementMatchActivityModel.findOne({ where: { classId, studentId } });
    if (!find) {
      throw new RestError(`info student not available!`, 404);
    }
    if (find.expired) {
      throw new RestError(`student has study ended!`, 404);
    }
    find.classId = null;
    find.teacherId = null;
    find.dateTimeSlot = null;
    await find.save({ transaction: transactionDb });
    return;
  }

  async findStudyPlannerByStudentIdAndClassId(studentId: number, classId: number): Promise<StudentManagementMatchActivityInterface[]> {
    const studyPlanner = await StudentManagementMatchActivityModel.findAll({ where: { studentId, classId }, include: StudentMatchActivitysModel });
    return studyPlanner.map((item) => this.transformModelToEntity(item));
  }

  async findStudentByClassId(classId: number): Promise<StudentManagementMatchActivityInterface[]> {
    const studyPlanner = await StudentManagementMatchActivityModel.findAll({ where: { classId } });
    return studyPlanner.map((item) => this.transformModelToEntity(item));
  }
  /**
   * Transforms database model into domain entity
   * @param model
   */
  private transformModelToEntity(model: StudentManagementMatchActivityModel): StudentManagementMatchActivityInterface {
    if (!model) return;
    const entity: any = {};
    const keysObj = Object.keys(model.dataValues);
    for (let key of keysObj) {
      entity[key] = model[key];
    }
    if (entity.productIds && entity.productIds.length) {
      entity.productIds = JSON.parse(entity.productIds);
    }
    if (entity.dateTimeSlot) {
      entity.dateTimeSlot = JSON.parse(entity.dateTimeSlot);
    }
    return entity;
  }
}
