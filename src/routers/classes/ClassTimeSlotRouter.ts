import { Router } from 'express';
import { ValidateValuesMiddleware } from '../../middlewares/values/ValidateValues';
import { VerifyTokenMiddleware } from '../../middlewares/auth/VerifyTokenMiddleware';
import { ClassTimeSlotSequelize } from '../../database/sequelize/ClassTimeSlotSequelize';
import { ClassTimeSlotUseCase } from '../../usecase/ClassTimeSlotUseCase';
import { ClassTimeSlotController } from '../../controllers/ClassTimeSlotController';

const BASE_ROUTE = '/class-time-slot';

enum Routes {
  FIND_ALL_CLASS_TIME_SLOT = '/find-all-class-time-slot',
  FIND_CLASS_TIME_SLOT_DETAIL = '/find-class-time-slot-detail',
  CREATE_CLASS_TIME_SLOT = '/create-class-time-slot',
  UPDATE_CLASS_TIME_SLOT = '/update-class-time-slot',
  DELETE_CLASS_TIME_SLOT = '/delete-class-time-slot'
}

export class ClassTimeSlotRouter {
  constructor() {}
  private validateValuesMiddleware: ValidateValuesMiddleware = new ValidateValuesMiddleware();
  private verifyTokenMiddleware: VerifyTokenMiddleware = new VerifyTokenMiddleware();
  private classTimeSlotSequelize: ClassTimeSlotSequelize = new ClassTimeSlotSequelize();
  private classTimeSlotUseCase: ClassTimeSlotUseCase = new ClassTimeSlotUseCase(this.classTimeSlotSequelize);
  private classTimeSlotController: ClassTimeSlotController = new ClassTimeSlotController(this.classTimeSlotUseCase);

  public routes(app: Router): void {
    app.get(BASE_ROUTE + Routes.FIND_ALL_CLASS_TIME_SLOT, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdCm, this.classTimeSlotController.findAllListsClassTimeSlot);
    app.post(BASE_ROUTE + Routes.FIND_CLASS_TIME_SLOT_DETAIL, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdCm, this.classTimeSlotController.findClassTimeSlotDetail);
    app.post(BASE_ROUTE + Routes.CREATE_CLASS_TIME_SLOT, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdCm, this.classTimeSlotController.createClassTimeSlot);
    this.verifyTokenMiddleware.permissionsRoleAdCm, app.post(BASE_ROUTE + Routes.UPDATE_CLASS_TIME_SLOT, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdCm, this.classTimeSlotController.updateClassTimeSlot);
    app.post(BASE_ROUTE + Routes.DELETE_CLASS_TIME_SLOT, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdCm, this.classTimeSlotController.deleteClassTimeSlot);
  }
}
