import { Router } from 'express';
import { TeacherController } from '../../controllers/TeacherController';
import { TeacherUseCase } from '../../usecase/TeacherUseCase';
import { VerifyTokenMiddleware } from '../../middlewares/auth/VerifyTokenMiddleware';
import { ValidateValuesMiddleware } from '../../middlewares/values/ValidateValues';
import { UserSequelize } from '../../database/sequelize/UsersSequelize';
import { CampusSequelize } from '../../database/sequelize/CampusSequelize';
import { TeacherSequelize } from '../../database/sequelize/TeacherSequelize';
import { ValidateCampusManager } from '../../middlewares/campus/ValidateCampusManager';
import { StudentManagementMatchActivitySequelize } from '../../database/sequelize/StudentManagementMatchActivitySequelize';
import { StudentManagementMatchActivityUseCase } from '../../usecase/StudentManagementMatchActivityUseCase';
import { StudentMatchActivitySequelize } from '../../database/sequelize/StudentMatchActivitySequelize';
import { StudentMatchActivityUseCase } from '../../usecase/StudentMatchActivityUseCase';
import { StudentMatchActivityController } from '../../controllers/StudentMatchActivityController';
import { classFeedbackSequelize } from '../../database/sequelize/ClassFeedbackSequelize';
import { ClassFeedbackUseCase } from '../../usecase/ClassFeedbackUseCase';
import { ClassReportSequelize } from '../../database/sequelize/ClassReportSequelize';
import { ClassReportUseCase } from '../../usecase/ClassReportUseCase';

const BASE_ROUTE = '/teachers';

enum Routes {
  CREATE_TEACHER = '/create-teacher',
  UPDATE_TEACHER = '/update-teacher',
  UPDATE_MULTI_ACTIVE_TEACHER = '/update-multi-activate',
  GET_TEACHER_BY_ID = '/get-teacher-by-id/:teacherId',
  GET_ALL_LIST_TEACHER_ONLINE = '/get-all-list-teacher',
  GET_LIST_TEACHER_OFFLINE = '/get-list-teacher-offline',
  GET_STUDENT_IN_CLASS_BY_CLASS_ID = '/get-student-in-class-by-class-id',
  UPDATE_STUDY_PLANNER_STATUS = '/update-study-planner-status',
  CREATE_CLASS_REPORT = '/create-class-report'
}
export class TeacherRoutes {
  constructor() {}
  private validateValuesMiddleware: ValidateValuesMiddleware = new ValidateValuesMiddleware();
  private verifyTokenMiddleware: VerifyTokenMiddleware = new VerifyTokenMiddleware();
  private userSequelize: UserSequelize = new UserSequelize();
  private validateCampusManager: ValidateCampusManager = new ValidateCampusManager();
  private campusSequelize: CampusSequelize = new CampusSequelize();
  private teacherSequelize: TeacherSequelize = new TeacherSequelize();
  private studentManagementMatchActivitySequelize: StudentManagementMatchActivitySequelize = new StudentManagementMatchActivitySequelize();
  private studentManagementMatchActivityUseCase: StudentManagementMatchActivityUseCase = new StudentManagementMatchActivityUseCase(this.studentManagementMatchActivitySequelize);
  private teacherUseCase: TeacherUseCase = new TeacherUseCase(this.userSequelize, this.campusSequelize, this.teacherSequelize);
  private studentMatchActivitySequelize: StudentMatchActivitySequelize = new StudentMatchActivitySequelize();
  private studentMatchActivityUseCase: StudentMatchActivityUseCase = new StudentMatchActivityUseCase(this.studentMatchActivitySequelize);
  private classReportSequelize: ClassReportSequelize = new ClassReportSequelize();
  private classReportUseCase: ClassReportUseCase = new ClassReportUseCase(this.classReportSequelize);
  private teacherController: TeacherController = new TeacherController(this.teacherUseCase, this.studentManagementMatchActivityUseCase, this.studentMatchActivityUseCase, this.classReportUseCase);

  public routes(app: Router): void {
    app.post(
      BASE_ROUTE + Routes.CREATE_TEACHER,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleAdCm,
      this.validateValuesMiddleware.validateCreateTeacher,
      this.validateCampusManager.validateCampusByUserId,
      this.teacherController.createTeacher
    );
    app.post(
      BASE_ROUTE + Routes.UPDATE_TEACHER,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleAdCm,
      this.validateValuesMiddleware.validateCreateTeacher,
      this.validateCampusManager.validateCampusByUserId,
      this.teacherController.updateTeacher
    );
    app.post(
      BASE_ROUTE + Routes.UPDATE_MULTI_ACTIVE_TEACHER,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleAdCm,
      this.validateValuesMiddleware.validateUpdateMultiTeacher,
      this.validateCampusManager.validateCampusByUserId,
      this.teacherController.updateMultiActivateTeacher
    );
    app.get(
      BASE_ROUTE + Routes.GET_TEACHER_BY_ID,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleAdCm,
      this.validateCampusManager.validateCampusByUserId,
      this.teacherController.getTeacherById
    );
    app.get(
      BASE_ROUTE + Routes.GET_ALL_LIST_TEACHER_ONLINE,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleAdmin,
      this.validateCampusManager.validateCampusByUserId,
      this.teacherController.getAllListTeachers
    );
    app.get(
      BASE_ROUTE + Routes.GET_LIST_TEACHER_OFFLINE,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleAdCm,
      this.validateCampusManager.validateCampusByUserId,
      this.teacherController.getListTeachersOffline
    );
    app.post(BASE_ROUTE + Routes.CREATE_CLASS_REPORT, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleTeacher, this.teacherController.createClassReport);
  }
}
