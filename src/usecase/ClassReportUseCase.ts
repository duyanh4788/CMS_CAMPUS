import { IClassReportRepository } from '../repository/ClassReportRepository';
import { RestError } from '../services/error/error';

export class ClassReportUseCase {
  constructor(private classReportRepository: IClassReportRepository) {}

  async findAllListsClassReportUseCase() {
    return await this.classReportRepository.findAllLists();
  }

  async findClassReportDetailUseCase(classReportId: number) {
    const classReport = await this.classReportRepository.findById(classReportId);
    if (!classReport) {
      throw new RestError('classReport not found!', 404);
    }
    return classReport;
  }

  async createClassReportUseCase(reqBody: any) {
    return await this.classReportRepository.createClassReport(reqBody);
  }

  async updateClassReportUseCase(reqBody: any) {
    await this.classReportRepository.updateClassReport(reqBody);
    return;
  }
}
