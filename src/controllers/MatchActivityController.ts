import { RestError } from '../services/error/error';
import { SendRespone } from '../services/success/success';
import { MatchActivityUseCase } from '../usecase/MatchActivityUseCase';
import { Request, Response } from 'express';

export class MatchActivityController {
  constructor(private matchActivityUseCase: MatchActivityUseCase) {}

  public updateActivity = async (req: Request, res: Response) => {
    try {
      const activity = await this.matchActivityUseCase.updateMatchActivityUseCase(req.body);
      return new SendRespone({ message: 'updated successfully!' }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public findAllListActivity = async (req: Request, res: Response) => {
    try {
      const activitys = await this.matchActivityUseCase.findAllListActivityUserCase();
      return new SendRespone({ data: activitys }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
}
