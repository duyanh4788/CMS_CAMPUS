import { Transaction } from 'sequelize';
import { RestError } from '../services/error/error';
import { IStudentManagementMatchActivityRepository } from '../repository/StudentManagementMatchActivityRepository';
import { groupListMatchAct } from '../utils/handlerArray';
import { StudentManagementMatchActivityInterface } from '../interface/StudentManagementMatchActivityInterface';

export class StudentManagementMatchActivityUseCase {
  constructor(private studentManagementMatchActivityRepository: IStudentManagementMatchActivityRepository) {}

  async createStudentManagementMatchActivityUseCase(reqBody: any, studentId: number, transactionDb: Transaction) {
    return this.studentManagementMatchActivityRepository.createStudentManagementActivity(reqBody, studentId, transactionDb);
  }

  async getListByStudentIdMatchActivityUseCase(studentId: number) {
    return await this.studentManagementMatchActivityRepository.findAllListsByStudentId(studentId);
  }

  async getStudentMatchActivityByIdUseCase(studentMnMActivityId: number) {
    const studentMnAtc = await this.studentManagementMatchActivityRepository.findById(studentMnMActivityId);
    if (!studentMnAtc) {
      throw new RestError('product for activity not available', 404);
    }
    return studentMnAtc;
  }

  async caculatorValidateProductIds(studentMnAtc: StudentManagementMatchActivityInterface, studentId: number, productIds: number[]) {
    if (studentMnAtc.studentId !== studentId) {
      throw new RestError('product for activity not available', 404);
    }
    if (!studentMnAtc.productIds || !studentMnAtc.productIds.length) return productIds;
    const isDif = JSON.stringify(studentMnAtc.productIds) === JSON.stringify(productIds);
    if (isDif) {
      throw new RestError('product new is duplicate', 404);
    }
    return productIds;
  }

  async updateProductIdsByIdUseCase(studentMnMActivityId: number, productIds: number[], transactionDb: Transaction) {
    return await this.studentManagementMatchActivityRepository.updateProductIdsById(studentMnMActivityId, productIds, transactionDb);
  }

  async deleteStudentManagementMatchActivityUseCase(studentMnMActivityId: number) {
    return await this.studentManagementMatchActivityRepository.deleteStudentManagementActivity(studentMnMActivityId);
  }

  async getStudyPlannerByStudentIdAndClassIdUseCase(studentId: number, classId: number) {
    return await this.studentManagementMatchActivityRepository.findStudyPlannerByStudentIdAndClassId(studentId, classId);
  }

  async getStudentByClassIdUseCase(classId: number) {
    return await this.studentManagementMatchActivityRepository.findStudentByClassId(classId);
  }
}
