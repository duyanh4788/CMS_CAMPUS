import { Transaction } from 'sequelize';
import { TeacherInterface } from '../interface/TeacherInterface';

export interface ITeacherRepository {
  findAllLists(type: string, campusId?: number, userId?: number): Promise<TeacherInterface[]>;

  findById(campusId: number, teacherId: number): Promise<TeacherInterface>;

  findByUserId(userId: number): Promise<TeacherInterface>;

  createTeacher(reqBody: TeacherInterface, userId: number, transactionDb?: Transaction): Promise<TeacherInterface>;

  updateTeacher(reqBody: TeacherInterface): Promise<void>;

  updateMultiActivateTeacher(teacherId: number): Promise<void>;
}
