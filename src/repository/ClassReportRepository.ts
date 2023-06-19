import { ClassReportInterface } from '../interface/ClassReport';

export interface IClassReportRepository {
  findAllLists(): Promise<ClassReportInterface[]>;

  findById(classId: number): Promise<ClassReportInterface>;

  createClassReport(reqBody: ClassReportInterface): Promise<ClassReportInterface>;

  updateClassReport(reqBody: any): Promise<ClassReportInterface>;

  deleteClassReport(classReportId: number): Promise<ClassReportInterface>;

  findTeacherInDate(teacherId: number, dateTimeSlot: any[]): Promise<boolean>;
}
