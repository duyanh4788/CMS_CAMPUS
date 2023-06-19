import { Transaction } from 'sequelize';
import { CampusInterface } from '../interface/CampusInterface';

export interface ICampusRepository {
  createCampus(reqBody: any): Promise<void>;

  findCampusByName(campusName: string): Promise<CampusInterface>;

  getListCampus(isTeacher: boolean): Promise<CampusInterface[]>;

  getCampusById(campusId: number): Promise<CampusInterface>;

  getCampusByTeacherId(teacherId: number): Promise<CampusInterface>;

  updateActiveMultiCampus(campusIds: number[], activate: boolean): Promise<void>;

  updateCampus(reqBody: any): Promise<void>;

  updateTeacherIdCampus(campusId: number, teacherId: number): Promise<void>;

  updateTeacherId(campusId: number, teacherId: number, transactionDb: Transaction): Promise<void>;
}
