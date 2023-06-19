import { Router } from 'express';
import { VerifyTokenMiddleware } from '../../middlewares/auth/VerifyTokenMiddleware';
import { Admincontroller } from '../../controllers/Admincontroller';
import { AdminUseCase } from '../../usecase/AdminUseCase';
import { AdminSequelize } from '../../database/sequelize/AdminSequelize';
import { ValidateValuesMiddleware } from '../../middlewares/values/ValidateValues';
import { CampusSequelize } from '../../database/sequelize/CampusSequelize';
import { CampusUseCase } from '../../usecase/CampusUseCase';

const BASE_ROUTE = '/admin';
const BASE_ROUTE_CM = '/campusmanager';

enum Routes {
  CREATE_CAMPUS = '/create-campus',
  UPDATE_CAMPUS = '/update-campus',
  GET_CAMPUS_BY_ID = '/get-campus-by-id/:campusId',
  GET_CAMPUS_BY_CM_ID = '/get-campus-by-cm-id/:teacherId',
  GET_ALL_LIST_CAMPUS = '/get-list-campus',
  GET_ALL_LIST_CAMPUS_NONE_TEACHER = '/get-list-campus-none-teacher',
  UPDATE_ACTVE_MULTI_CAMPUS = '/update-active-multi-campus'
}

export class AdminRouter {
  private validateValuesMiddleware: ValidateValuesMiddleware = new ValidateValuesMiddleware();
  private verifyTokenMiddleware: VerifyTokenMiddleware = new VerifyTokenMiddleware();
  private adminSequelize: AdminSequelize = new AdminSequelize();
  private campusSequelize: CampusSequelize = new CampusSequelize();
  private adminUseCase: AdminUseCase = new AdminUseCase(this.adminSequelize);
  private campusUseCase: CampusUseCase = new CampusUseCase(this.campusSequelize);
  private admincontroller: Admincontroller = new Admincontroller(this.adminUseCase, this.campusUseCase);
  constructor() {}

  public routes(app: Router): void {
    app.post(
      BASE_ROUTE + Routes.CREATE_CAMPUS,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleAdmin,
      this.validateValuesMiddleware.validateCreateCampus,
      this.admincontroller.adminCreateCampus
    );
    app.post(
      BASE_ROUTE + Routes.UPDATE_CAMPUS,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleAdmin,
      this.validateValuesMiddleware.validateCreateCampus,
      this.admincontroller.adminUpdateCampus
    );
    app.get(BASE_ROUTE + Routes.GET_ALL_LIST_CAMPUS, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.admincontroller.adminGetListCampus);
    app.get(
      BASE_ROUTE + Routes.GET_ALL_LIST_CAMPUS_NONE_TEACHER,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleAdmin,
      this.admincontroller.adminGetListCampusNoneTeacher
    );
    app.get(BASE_ROUTE + Routes.GET_CAMPUS_BY_ID, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.admincontroller.adminGetCampusById);
    app.get(BASE_ROUTE_CM + Routes.GET_CAMPUS_BY_CM_ID, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleCampusManager, this.admincontroller.adminGetCampusByCMId);
    app.post(
      BASE_ROUTE + Routes.UPDATE_ACTVE_MULTI_CAMPUS,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleAdmin,
      this.validateValuesMiddleware.validateUpdateMultiCampus,
      this.admincontroller.adminUpdateActiveMultiCampus
    );
  }
}
