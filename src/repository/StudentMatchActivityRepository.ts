import { Transaction } from 'sequelize';
import { StudentMatchActivityInterface } from '../interface/StudentMatchActivityInterface';

export interface IStudentMatchActivityRepository {
  findAllLists(): Promise<StudentMatchActivityInterface[]>;

  findById(studentMatchActivityId: number): Promise<StudentMatchActivityInterface>;

  findByProductId(productId: number): Promise<StudentMatchActivityInterface>;

  createStudentProducts(reqBody: StudentMatchActivityInterface, transactionDb: Transaction): Promise<StudentMatchActivityInterface>;

  updateStudentProducts(reqBody: any, transactionDb: Transaction): Promise<void>;

  deleteStudentProducts(studentId: number, productId: number, transactionDb: Transaction): Promise<void>;

  removeStudentInClass(studentId: number, classId: number, transactionDb: Transaction): Promise<void>;

  updateStatusStudyPlanner(studentId: number, studentMatchActivityId: number, status: string): Promise<void>;
}
