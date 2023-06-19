import { Router } from 'express';
import { GroupUseCase } from '../../usecase/GroupUseCase';
import { GroupController } from '../../controllers/GroupController';
import { GroupSequelize } from '../../database/sequelize/GroupSequelize';
import { MatchActivityController } from '../../controllers/MatchActivityController';
import { VerifyTokenMiddleware } from '../../middlewares/auth/VerifyTokenMiddleware';
import { MatchActivitySequelize } from '../../database/sequelize/MatchActivitySequelize';
import { MatchActivityUseCase } from '../../usecase/MatchActivityUseCase';
// import { UPDATE } from 'sequelize/types/query-types';

const BASE_ROUTE = '/groups';

enum Routes {
  GET_ALL_GROUP = '/get-all-group',
  GET_GROUP_DETAIL = '/get-group-detail',
  CREATE_GROUP = '/create-group',
  UPDATE_GROUP = '/update-group',
  UPDATE_ACTIVITY = '/update-activity'
}

export class GroupRoutes {
  constructor() {}
  private verifyTokenMiddleware: VerifyTokenMiddleware = new VerifyTokenMiddleware();
  private groupSequelize: GroupSequelize = new GroupSequelize();
  private matchActivitySequelize: MatchActivitySequelize = new MatchActivitySequelize();
  private groupUseCase: GroupUseCase = new GroupUseCase(this.groupSequelize);
  private matchActivityUseCase: MatchActivityUseCase = new MatchActivityUseCase(this.matchActivitySequelize);
  private groupController: GroupController = new GroupController(this.groupUseCase, this.matchActivityUseCase);
  private matchActivityController: MatchActivityController = new MatchActivityController(this.matchActivityUseCase);

  public routes(app: Router): void {
    app.get(BASE_ROUTE + Routes.GET_ALL_GROUP, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.groupController.findAllListGroup);
    app.post(BASE_ROUTE + Routes.GET_GROUP_DETAIL, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.groupController.findGroupDetail);
    app.post(BASE_ROUTE + Routes.CREATE_GROUP, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.groupController.createGroup);
    app.post(BASE_ROUTE + Routes.UPDATE_GROUP, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.groupController.updateGroup);
    app.post(BASE_ROUTE + Routes.UPDATE_ACTIVITY, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.matchActivityController.updateActivity);
  }
}
