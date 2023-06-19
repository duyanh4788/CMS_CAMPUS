import { TeacherOfDateInterface } from '../interface/TeacherOfDateInterface';

export interface ITeacherOfDateRepository {
  findAllLists(teacherId: number): Promise<TeacherOfDateInterface[]>;

  findById(teacherId: number): Promise<TeacherOfDateInterface>;

  createTeacherOfDate(reqBody: TeacherOfDateInterface): Promise<void>;

  updateTeacherOfDate(reqBody: TeacherOfDateInterface): Promise<void>;

  deleteTeacherOfDate(teacherId: number): Promise<void>;

  findTeacherByDateOffTimeSlotId(teacherId: number, classStartDate: Date, classTimeSlotIds: number[]): Promise<boolean>;
}
