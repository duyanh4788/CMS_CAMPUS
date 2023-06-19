import { Router } from 'express';
import { StudentUseCase } from '../../usecase/StudentUseCase';
import { StudentController } from '../../controllers/StudentController';
import { ValidateValuesMiddleware } from '../../middlewares/values/ValidateValues';
import { VerifyTokenMiddleware } from '../../middlewares/auth/VerifyTokenMiddleware';
import { UserSequelize } from '../../database/sequelize/UsersSequelize';
import { StudentSequelize } from '../../database/sequelize/StudentSequelize';
import { StudentMatchActivityUseCase } from '../../usecase/StudentMatchActivityUseCase';
import { StudentMatchActivitySequelize } from '../../database/sequelize/StudentMatchActivitySequelize';
import { StudentMatchActivityController } from '../../controllers/StudentMatchActivityController';
import { ProductUseCase } from '../../usecase/ProductUseCase';
import { ProductGroupsSequelize } from '../../database/sequelize/ProductGroupsSequelize';
import { ProductSequelize } from '../../database/sequelize/ProductSequelize';
import { GroupSequelize } from '../../database/sequelize/GroupSequelize';
import { StudentManagementMatchActivityUseCase } from '../../usecase/StudentManagementMatchActivityUseCase';
import { StudentManagementMatchActivitySequelize } from '../../database/sequelize/StudentManagementMatchActivitySequelize';
import { ValidateCampusManager } from '../../middlewares/campus/ValidateCampusManager';
import { classFeedbackSequelize } from '../../database/sequelize/ClassFeedbackSequelize';
import { ClassFeedbackUseCase } from '../../usecase/ClassFeedbackUseCase';

const BASE_ROUTE = '/students';

enum Routes {
  CREATE_STUDENT = '/create-student',
  UPDATE_STUDENT = '/update-student',
  UPDATE_MULTI_ACTIVE_STUDENT = '/update-multi-activate',
  GET_LIST_STUDENT = '/get-list-student',
  GET_STUDENT_STUDENT_BY_ID = '/get-student-by-id/:studentId',
  GET_GROUP_MATCH_ACTIVITY_BY_STUDENT_ID = '/get-group-match-activity-by-student-id/:studentId',
  GET_STUDENT_MATCH_ACTIVITY_BY_PRODUCT_ID = '/get-student-match-activity-by-product-id',
  ADD_NEW_BY_PRODUCT = '/add-new-product',
  UPDATE_BY_PRODUCT = '/update-new-product',
  CREATE_CLASS_FEEDBACK = '/create-class-feedback'
}

export class StudentRoutes {
  constructor() {}
  private validateValuesMiddleware: ValidateValuesMiddleware = new ValidateValuesMiddleware();
  private verifyTokenMiddleware: VerifyTokenMiddleware = new VerifyTokenMiddleware();
  private validateCampusManager: ValidateCampusManager = new ValidateCampusManager();
  private userSequelize: UserSequelize = new UserSequelize();
  private studentSequelize: StudentSequelize = new StudentSequelize();
  private studentMatchActivitySequelize: StudentMatchActivitySequelize = new StudentMatchActivitySequelize();
  private groupSequelize: GroupSequelize = new GroupSequelize();
  private productSequelize: ProductSequelize = new ProductSequelize();
  private productGroupsSequelize: ProductGroupsSequelize = new ProductGroupsSequelize();
  private studentManagementMatchActivitySequelize: StudentManagementMatchActivitySequelize = new StudentManagementMatchActivitySequelize();
  private productUseCase: ProductUseCase = new ProductUseCase(this.productSequelize, this.productGroupsSequelize, this.groupSequelize);
  private studentMatchActivityUseCase: StudentMatchActivityUseCase = new StudentMatchActivityUseCase(this.studentMatchActivitySequelize);
  private studentManagementMatchActivityUseCase: StudentManagementMatchActivityUseCase = new StudentManagementMatchActivityUseCase(this.studentManagementMatchActivitySequelize);
  private studentUseCase: StudentUseCase = new StudentUseCase(this.userSequelize, this.studentSequelize);
  private classFeedbackSequelize: classFeedbackSequelize = new classFeedbackSequelize();
  private classFeedbackUseCase: ClassFeedbackUseCase = new ClassFeedbackUseCase(this.classFeedbackSequelize);
  private studentController: StudentController = new StudentController(
    this.studentUseCase,
    this.studentMatchActivityUseCase,
    this.productUseCase,
    this.studentManagementMatchActivityUseCase,
    this.classFeedbackUseCase
  );
  private studentMatchActivityController: StudentMatchActivityController = new StudentMatchActivityController(this.studentMatchActivityUseCase);

  public routes(app: Router): void {
    app.post(
      BASE_ROUTE + Routes.CREATE_STUDENT,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleAdCm,
      this.validateCampusManager.validateCampusByUserId,
      this.studentController.createStudent
    );
    app.post(
      BASE_ROUTE + Routes.UPDATE_STUDENT,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleAdCm,
      this.validateCampusManager.validateCampusByUserId,
      this.studentController.updateStudent
    );
    app.post(
      BASE_ROUTE + Routes.UPDATE_MULTI_ACTIVE_STUDENT,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleAdCm,
      this.validateCampusManager.validateCampusByUserId,
      this.studentController.updateMultiActivate
    );
    app.get(
      BASE_ROUTE + Routes.GET_LIST_STUDENT,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleAdCm,
      this.validateCampusManager.validateCampusByUserId,
      this.studentController.getListStudents
    );
    app.get(
      BASE_ROUTE + Routes.GET_STUDENT_STUDENT_BY_ID,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleAdCm,
      this.validateCampusManager.validateCampusByUserId,
      this.studentController.getStudentById
    );
    app.get(
      BASE_ROUTE + Routes.GET_GROUP_MATCH_ACTIVITY_BY_STUDENT_ID,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleAdCm,
      this.validateCampusManager.validateCampusByUserId,
      this.studentController.getGroupsMatchActivityByStudentId
    );
    app.post(
      BASE_ROUTE + Routes.ADD_NEW_BY_PRODUCT,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleAdCm,
      this.validateCampusManager.validateCampusByUserId,
      this.studentController.addNewProducts
    );
    app.post(
      BASE_ROUTE + Routes.UPDATE_BY_PRODUCT,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleAdCm,
      this.validateCampusManager.validateCampusByUserId,
      this.studentController.updateProducts
    );
    app.post(
      BASE_ROUTE + Routes.GET_STUDENT_MATCH_ACTIVITY_BY_PRODUCT_ID,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleAdCm,
      this.validateCampusManager.validateCampusByUserId,
      this.studentMatchActivityController.getListStudentMatchActivityByProductId
    );
    app.post(BASE_ROUTE + Routes.CREATE_CLASS_FEEDBACK, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleStudent, this.studentController.createClassFeedback);
  }
}
