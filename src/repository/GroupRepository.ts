import { GroupInterface } from '../interface/GroupInterface';

export interface IGroupRepository {
  findAllLists(): Promise<GroupInterface[]>;

  findById(groupId: number, isAtt?: boolean): Promise<GroupInterface>;

  createGroup(reqBody: any): Promise<GroupInterface>;

  updateGroup(reqBody: any): Promise<void>;

  findByName(name: string): Promise<GroupInterface>;
}
