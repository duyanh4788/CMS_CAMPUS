import { MatchActivityInterface } from '../interface/MatchActivityInterface';
import { IMatchActivityRepository } from '../repository/MatchActivityRepository';

export class MatchActivityUseCase {
  constructor(private matchActivityRepository: IMatchActivityRepository) {}

  async createActivityUseCase(reqBody: MatchActivityInterface) {
    await this.matchActivityRepository.createActivity(reqBody);
    return;
  }
  async updateMatchActivityUseCase(reqBody: MatchActivityInterface) {
    await this.matchActivityRepository.updateActivity(reqBody);
    return;
  }
  async findAllListActivityUserCase() {
    return await this.matchActivityRepository.findAllLists();
  }

  async findActivityDetailUseCase(GroupId: number) {
    return await this.matchActivityRepository.findActivityByGroupId(GroupId);
  }
}
