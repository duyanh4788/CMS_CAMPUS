import { ClassFeedbackInterface } from '../interface/ClassFeedbackInterface';

export interface IClassFeedbackRepository {
  findAllLists(): Promise<ClassFeedbackInterface[]>;
  findById(classFeedbackId: number): Promise<ClassFeedbackInterface>;
  findByClassId(classId: number): Promise<ClassFeedbackInterface>;
  createClassFeedback(reqBody: any): Promise<ClassFeedbackInterface>;
  updateClassFeedback(reqBody: any): Promise<void>;
  deleteClassFeedback(classFeedbackId: number): Promise<void>;
}
