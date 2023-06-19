import { ClassFeedbackInterface } from '../../interface/ClassFeedbackInterface';
import { IClassFeedbackRepository } from '../../repository/ClassFeedbackRepository';
import { ClassFeedbacksModel } from '../model/ClassFeedbacksModel';

export class classFeedbackSequelize implements IClassFeedbackRepository {
  async createClassFeedback(reqBody: any): Promise<ClassFeedbackInterface> {
    const { classId, studentId, teacherId, campusId, date, satisfaction, comment } = reqBody;
    const createClassFeedback = await ClassFeedbacksModel.create({ classId, studentId, teacherId, campusId, date, satisfaction, comment });
    return this.transformModelToEntity(createClassFeedback);
  }
  async deleteClassFeedback(classFeedbackId: number): Promise<void> {
    return;
  }
  async findAllLists(): Promise<ClassFeedbackInterface[]> {
    return;
  }
  async findById(classFeedbackId: number): Promise<ClassFeedbackInterface> {
    return;
  }
  async findByClassId(classId: number): Promise<ClassFeedbackInterface> {
    return;
  }
  async updateClassFeedback(reqBody: any): Promise<void> {}

  private transformModelToEntity(model: ClassFeedbacksModel): ClassFeedbackInterface {
    if (!model) return;
    const entity: any = {};
    const keysObj = Object.keys(model.dataValues);
    for (let key of keysObj) {
      entity[key] = model[key];
    }
    if (entity.productIds && entity.productIds.length) {
      entity.productIds = JSON.parse(entity.productIds);
    }
    return entity;
  }
}
