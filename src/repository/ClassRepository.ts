import { Transaction } from 'sequelize';
import { ClassInterface } from '../interface/ClassInterface';

export interface IClassRepository {
  findAllLists(classId: number): Promise<ClassInterface[]>;

  findById(classId: number): Promise<ClassInterface>;

  createClass(reqBody: ClassInterface, numberStudent: number, transactionDb: Transaction): Promise<ClassInterface>;

  updateClass(reqBody: any): Promise<ClassInterface>;

  deleteClass(classId: number): Promise<ClassInterface>;

  updateAvailableNumStudent(classId: number, value: number, type: string, transactionDb: Transaction): Promise<void>;

  findTeacherInDate(teacherId: number, dateTimeSlot: any[]): Promise<boolean>;

  getListClassByTeacherId(teacherId: number, campusId: number): Promise<ClassInterface[]>;
}
