import { GroupInterface } from '../../interface/GroupInterface';
import { IGroupRepository } from '../../repository/GroupRepository';
import { GroupsModel } from '../model/GroupsModel';
import { MatchActivitiesModel } from '../model/MatchActivitiesModel';

export class GroupSequelize implements IGroupRepository {
  async findAllLists(): Promise<GroupInterface[]> {
    const groups = await GroupsModel.findAll();
    return groups.map((item) => this.transformModelToEntity(item));
  }

  async findByName(name: string): Promise<GroupInterface> {
    const findByName = await GroupsModel.findOne({ where: { name } });
    return this.transformModelToEntity(findByName);
  }

  async findById(groupId: number, isAtt: boolean = false): Promise<GroupInterface> {
    const options: any = {
      include: [
        {
          model: MatchActivitiesModel,
          attributes: ['matchedActivityId']
        }
      ]
    };
    if (isAtt) {
      options.attributes = ['groupId'];
    }
    const findById = await GroupsModel.findByPk(groupId, options);
    return this.transformModelToEntity(findById);
  }

  async createGroup(reqBody: any): Promise<GroupInterface> {
    const { name } = reqBody;
    const createGroup = await GroupsModel.create({ name });
    return this.transformModelToEntity(createGroup);
  }

  async updateGroup(reqBody: any): Promise<void> {
    const { groupId, name } = reqBody;
    await GroupsModel.update({ name }, { where: { groupId: groupId } });
    return;
  }

  /**
   * Transforms database model into domain entity
   * @param model
   */
  private transformModelToEntity(model: GroupsModel): GroupInterface {
    if (!model) return;
    const entity: any = {};
    const keysObj = Object.keys(model.dataValues);
    for (let key of keysObj) {
      entity[key] = model[key];
    }
    if (entity.matchActivities) {
      entity.matchActivityIds = entity.matchActivities.map((item) => item.matchedActivityId);
      delete entity.matchActivities;
    }

    return entity;
  }
}
