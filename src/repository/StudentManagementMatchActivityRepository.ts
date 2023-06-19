import { Transaction } from 'sequelize';
import { StudentManagementMatchActivityInterface } from '../interface/StudentManagementMatchActivityInterface';

export interface IStudentManagementMatchActivityRepository {
  findAllListsByStudentId(studentId: number): Promise<StudentManagementMatchActivityInterface[]>;

  findById(studentMnMActivityId: number): Promise<StudentManagementMatchActivityInterface>;

  findByStudentIdCheckDateTimeSlot(studentId: number, dateTimeSlot: any[]): Promise<boolean>;

  findByStudentIdProductId(studentId: number, productIds: number[]): Promise<StudentManagementMatchActivityInterface | StudentManagementMatchActivityInterface[]>;

  findByProductIdWithNoneClass(productIds: number[]): Promise<StudentManagementMatchActivityInterface[]>;

  findByStudentIdProductIdClassId(studentId: number, productIds: number[], classId: number): Promise<StudentManagementMatchActivityInterface | StudentManagementMatchActivityInterface[]>;

  createStudentManagementActivity(reqBody: any, studentId: number, transactionDb: Transaction): Promise<StudentManagementMatchActivityInterface>;

  updateStudentManagementActivity(reqBody: any, transactionDb: Transaction): Promise<void>;

  updateProductIdsById(studentMnMActivityId: number, productIds: number[], transactionDb: Transaction): Promise<void>;

  deleteStudentManagementActivity(studentMnMActivityId: number): Promise<void>;

  removeStudentInClass(studentId: number, classId: number, transactionDb: Transaction): Promise<void>;

  findStudyPlannerByStudentIdAndClassId(studentId: number, classId: number): Promise<StudentManagementMatchActivityInterface[]>;

  findStudentByClassId(classId: number): Promise<StudentManagementMatchActivityInterface[]>;
}
