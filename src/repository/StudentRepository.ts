import { Transaction } from 'sequelize';
import { StudentInterface } from '../interface/StudentInterface';

export interface IStudentRepository {
  findAllListsByCampusId(campusId: number): Promise<StudentInterface[]>;

  findById(studentId: number): Promise<StudentInterface>;

  findByUserId(userId: number): Promise<StudentInterface>;

  createStudent(reqBody: StudentInterface, userId: number, campusId: number, transactionDb?: Transaction): Promise<StudentInterface>;

  updateStudent(reqBody: StudentInterface): Promise<void>;

  updateMultiActivateStudent(studentId: number): Promise<void>;
}
