export interface ClassReportInterface {
  classId?: number;
  campusId?: number;
  teacherId?: number;
  studentIds: number;
  date?: Date;
  status?: string;
  attendance?: string;
  comment?: string;
  preparation?: number;
  attitude?: number;
  participation?: number;
  createdAt?: Date;
}
