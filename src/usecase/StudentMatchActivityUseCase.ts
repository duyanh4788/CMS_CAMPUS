import { Transaction } from 'sequelize';
import { IStudentMatchActivityRepository } from '../repository/StudentMatchActivityRepository';
export class StudentMatchActivityUseCase {
  constructor(private studentMatchActivityRepository: IStudentMatchActivityRepository) {}

  async createStudentMatchActivityUseCase(reqBody: any, transactionDb: Transaction) {
    const { listGroupsMatc, studentMnMActivityId, studentId, type } = reqBody;
    await Promise.all(
      listGroupsMatc.map(async (itemA) => {
        await Promise.all(
          itemA.matchActivityIds.map(async (itemB) => {
            await this.studentMatchActivityRepository.createStudentProducts({ ...itemA, matchActivityId: itemB, studentMnMActivityId, studentId, type }, transactionDb);
          })
        );
      })
    );
    return;
  }

  async getListStudentMatchActivityUseCase() {
    return await this.studentMatchActivityRepository.findAllLists();
  }

  async getListStudentMatchActivityByProductIdUseCase(productId: number) {
    return await this.studentMatchActivityRepository.findByProductId(productId);
  }

  async deleteMatchActivityByIdUseCase(studentId: number, productId: number, transactionDb: Transaction) {
    return await this.studentMatchActivityRepository.deleteStudentProducts(studentId, productId, transactionDb);
  }

  async updateStatusStudyPlannerUseCase(studentId: number, studentMatchActivityId: number, status: string) {
    return await this.studentMatchActivityRepository.updateStatusStudyPlanner(studentId, studentMatchActivityId, status);
  }
}
