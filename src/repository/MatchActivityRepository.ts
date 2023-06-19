import { MatchActivityInterface } from '../interface/MatchActivityInterface';

export interface IMatchActivityRepository {
  findAllLists(): Promise<MatchActivityInterface[]>;

  findById(matchedActivityId: number): Promise<MatchActivityInterface>;

  createActivity(reqBody: any): Promise<MatchActivityInterface>;

  updateActivity(reqBody: any): Promise<any>;

  findActivityByGroupId(groupId: number): Promise<MatchActivityInterface[]>;
}
