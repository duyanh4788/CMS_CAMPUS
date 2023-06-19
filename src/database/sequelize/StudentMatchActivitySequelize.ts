import { StudentMatchActivityInterface } from '../../interface/StudentMatchActivityInterface';
import { IStudentMatchActivityRepository } from '../../repository/StudentMatchActivityRepository';
import { Transaction } from 'sequelize';
import { StudentMatchActivitysModel } from '../model/StudentMatchActivitysModel';
import { RestError } from '../../services/error/error';

export class StudentMatchActivitySequelize implements IStudentMatchActivityRepository {
  async findAllLists(): Promise<StudentMatchActivityInterface[]> {
    return;
  }

  async findById(studentMatchActivityId: number): Promise<StudentMatchActivityInterface> {
    return;
  }

  async findByProductId(productId: number): Promise<StudentMatchActivityInterface> {
    const studentMatchActivity = await StudentMatchActivitysModel.findOne({
      where: {
        productId: productId
      }
    });
    return this.transformModelToEntity(studentMatchActivity);
  }

  async createStudentProducts(reqBody: StudentMatchActivityInterface, transactionDb: Transaction): Promise<StudentMatchActivityInterface> {
    const { studentId, studentMnMActivityId, productId, groupId, matchActivityId, numberOfWeeks, type } = reqBody;
    await StudentMatchActivitysModel.create({ studentId, studentMnMActivityId, productId, groupId, matchActivityId, numberOfWeeks, type }, { transaction: transactionDb });
    return;
  }

  async updateStudentProducts(reqBody: any, transactionDb: Transaction): Promise<void> {
    const { studentMnMActivityId, classId, teacherId } = reqBody;
    await StudentMatchActivitysModel.update({ classId, teacherId }, { where: { studentMnMActivityId }, transaction: transactionDb });
    return;
  }

  async deleteStudentProducts(studentId: number, productId: number, transactionDb: Transaction): Promise<void> {
    await StudentMatchActivitysModel.destroy({ where: { studentId, productId }, transaction: transactionDb });
    return;
  }

  async removeStudentInClass(studentId: number, classId: number, transactionDb: Transaction): Promise<void> {
    await StudentMatchActivitysModel.update({ classId: null, teacherId: null }, { where: { classId, studentId }, transaction: transactionDb });
    return;
  }

  async updateStatusStudyPlanner(studentId: number, studentMatchActivityId: number, status: string): Promise<void> {
    const oldStatus = await StudentMatchActivitysModel.findOne({ where: { studentId, studentMatchActivityId } });
    if (status === 'todo') {
      throw new RestError("Can't change activity to todo", 404);
    }

    if (status === 'done') {
      if (oldStatus.status === 'done') {
        throw new RestError('This activity was done', 404);
      } else if (oldStatus.status === 'todo') {
        await StudentMatchActivitysModel.update({ status }, { where: { studentId, studentMatchActivityId } });
      } else if (oldStatus.status === 'incomplete') {
        await StudentMatchActivitysModel.update({ status }, { where: { studentId, studentMatchActivityId } });
      }
    }

    if (status === 'incomplete') {
      if (oldStatus.status === 'done') {
        throw new RestError("Can't change activity from done to incomplete", 404);
      } else if (oldStatus.status === 'todo') {
        await StudentMatchActivitysModel.update({ status }, { where: { studentId, studentMatchActivityId } });
      } else if (oldStatus.status === 'incomplete') {
        throw new RestError("Can't change activity from incomplete to incomplete", 404);
      }
    }
    return;
  }

  /**
   * Transforms database model into domain entity
   * @param model
   */
  private transformModelToEntity(model: StudentMatchActivitysModel): StudentMatchActivityInterface {
    if (!model) return;
    const entity: any = {};
    const keysObj = Object.keys(model.dataValues);
    for (let key of keysObj) {
      entity[key] = model[key];
    }
    return entity;
  }
}
