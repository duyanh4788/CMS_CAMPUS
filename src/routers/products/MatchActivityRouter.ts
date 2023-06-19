import { Router } from 'express';
import { MatchActivityController } from '../../controllers/MatchActivityController';
import { VerifyTokenMiddleware } from '../../middlewares/auth/VerifyTokenMiddleware';
import { MatchActivitySequelize } from '../../database/sequelize/MatchActivitySequelize';
import { MatchActivityUseCase } from '../../usecase/MatchActivityUseCase';

const BASE_ROUTE = '/matchactivities';

enum Routes {
  UPADATE_ACTIVITY = '/update-activity',
  GET_ALL_ACTIVITY = '/get-all-activity'
}

export class MatchActivityRoutes {
  constructor() {}
  private verifyTokenMiddleware: VerifyTokenMiddleware = new VerifyTokenMiddleware();
  private matchActivitySequelize: MatchActivitySequelize = new MatchActivitySequelize();
  private matchActivityUseCase: MatchActivityUseCase = new MatchActivityUseCase(this.matchActivitySequelize);
  private activityController: MatchActivityController = new MatchActivityController(this.matchActivityUseCase);

  public routes(app: Router): void {
    app.post(BASE_ROUTE + Routes.UPADATE_ACTIVITY, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.activityController.updateActivity);
    app.get(BASE_ROUTE + Routes.GET_ALL_ACTIVITY, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.activityController.findAllListActivity);
  }
}
