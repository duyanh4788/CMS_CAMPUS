import { RestError } from '../services/error/error';
import { SendRespone } from '../services/success/success';
import { MatchActivityUseCase } from '../usecase/MatchActivityUseCase';
import { GroupUseCase } from '../usecase/GroupUseCase';
import { Request, Response } from 'express';

export class GroupController {
  constructor(private groupUseCase: GroupUseCase, private matchActivityUseCase: MatchActivityUseCase) {}

  public createGroup = async (req: Request, res: Response) => {
    try {
      const { name, matchActivities } = req.body;
      const group = await this.groupUseCase.createGroupUseCase(req.body);
      const request = matchActivities.map((item) => {
        return { ...item, groupId: group.groupId };
      });
      await Promise.all(
        request.map(async (item) => {
          await this.matchActivityUseCase.createActivityUseCase(item);
        })
      );
      return new SendRespone({ message: 'created successfully!' }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
  public updateGroup = async (req: Request, res: Response) => {
    try {
      const group = await this.groupUseCase.updateGroupUseCase(req.body);
      return new SendRespone({ message: 'updated successfully!' }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public findAllListGroup = async (req: Request, res: Response) => {
    try {
      const groups = await this.groupUseCase.findAllListGroupUserCase();
      return new SendRespone({ data: groups }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public findGroupDetail = async (req: Request, res: Response) => {
    try {
      const { groupId } = req.body;
      const group = await this.groupUseCase.findGroupDetailUseCase(groupId);
      const activities = await this.matchActivityUseCase.findActivityDetailUseCase(groupId);
      return new SendRespone({ data: { group, activities } }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
}
