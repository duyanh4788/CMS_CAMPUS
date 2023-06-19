import { ClassReportInterface } from '../../interface/ClassReport';
import { IClassReportRepository } from '../../repository/ClassReportRepository';
import { ClassReportsModel } from '../model/ClassReportsModel';

export class ClassReportSequelize implements IClassReportRepository {
  async createClassReport(reqBody: any): Promise<ClassReportInterface> {
    const { classId, studentId, teacherId, campusId, date, status, attendance, comment, preparation, attitude, participation } = reqBody;
    const createClassReport = await ClassReportsModel.create({ classId, studentId, teacherId, campusId, date, status, attendance, comment, preparation, attitude, participation });
    return this.transformModelToEntity(createClassReport);
  }

  deleteClassReport(classReportId: number): Promise<ClassReportInterface> {
    return;
  }

  async findAllLists(): Promise<ClassReportInterface[]> {
    return;
  }

  async findById(classFeedbackId: number): Promise<ClassReportInterface> {
    return;
  }

  async findTeacherInDate(teacherId: number, dateTimeSlot: any[]): Promise<boolean> {
    return;
  }

  updateClassReport(reqBody: any): Promise<ClassReportInterface> {
    return;
  }

  private transformModelToEntity(model: ClassReportsModel): ClassReportInterface {
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
