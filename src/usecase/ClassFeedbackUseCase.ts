import { Transaction } from 'sequelize';
import { IClassFeedbackRepository } from '../repository/ClassFeedbackRepository';
export class ClassFeedbackUseCase {
  constructor(private classFeedbackRepository: IClassFeedbackRepository) {}
  async createClassFeedbackUseCase(reqBody: any) {
    return await this.classFeedbackRepository.createClassFeedback(reqBody);
  }
}
