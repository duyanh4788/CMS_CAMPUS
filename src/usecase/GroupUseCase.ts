import { GroupInterface } from '../interface/GroupInterface';
import { IGroupRepository } from '../repository/GroupRepository';
import { RestError } from '../services/error/error';

export class GroupUseCase {
  constructor(private groupRepository: IGroupRepository) {}
  async createGroupUseCase(reqBody: GroupInterface) {
    const group = await this.groupRepository.findByName(reqBody.name);
    if (group) {
      throw new RestError('group name is has exist!', 404);
    }
    return await this.groupRepository.createGroup(reqBody);
  }
  async updateGroupUseCase(reqBody: GroupInterface) {
    await this.groupRepository.updateGroup(reqBody);
    return;
  }

  async findAllListGroupUserCase() {
    return await this.groupRepository.findAllLists();
  }

  async findAllListActivityUserCase() {
    return await this.groupRepository.findAllLists();
  }

  async findGroupDetailUseCase(groupId: number) {
    const group = await this.groupRepository.findById(groupId);
    if (!group) {
      throw new RestError('group not found!', 404);
    }
    return group;
  }
}
