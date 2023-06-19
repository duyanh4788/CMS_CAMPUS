import { MatchActivityInterface } from '../../interface/MatchActivityInterface';
import { IMatchActivityRepository } from '../../repository/MatchActivityRepository';
import { MatchActivitiesModel } from '../model/MatchActivitiesModel';

export class MatchActivitySequelize implements IMatchActivityRepository {
  async findAllLists(): Promise<MatchActivityInterface[]> {
    const activities = await MatchActivitiesModel.findAll();
    return activities.map((item) => this.transformModelToEntity(item));
  }
  async findById(matchedActivityId: number): Promise<MatchActivityInterface> {
    return undefined;
  }
  async createActivity(reqBody: any): Promise<MatchActivityInterface> {
    const { name, time, groupId, type } = reqBody;
    const createActivity = await MatchActivitiesModel.create({ name, time, groupId, type });
    return this.transformModelToEntity(createActivity);
  }

  async updateActivity(reqBody: any): Promise<MatchActivityInterface> {
    const { matchedActivityId, name, time, groupId, type } = reqBody;
    await MatchActivitiesModel.update({ name, time, groupId, type }, { where: { matchedActivityId: matchedActivityId } });
    return;
  }

  async findActivityByGroupId(groupId: number): Promise<MatchActivityInterface[]> {
    const activities = await MatchActivitiesModel.findAll({ where: { groupId } });
    return activities.map((item) => this.transformModelToEntity(item));
  }

  /**
   * Transforms database model into domain entity
   * @param model
   */
  private transformModelToEntity(model: MatchActivitiesModel): MatchActivityInterface {
    if (!model) return;
    const entity: any = {};
    const keysObj = Object.keys(model.dataValues);
    for (let key of keysObj) {
      entity[key] = model[key];
    }
    return entity;
  }
}
