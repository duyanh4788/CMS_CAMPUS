import { Router } from 'express';
import { ClassUserCase } from '../../usecase/ClassUseCase';
import { ClassController } from '../../controllers/ClassController';
import { ValidateValuesMiddleware } from '../../middlewares/values/ValidateValues';
import { VerifyTokenMiddleware } from '../../middlewares/auth/VerifyTokenMiddleware';
import { ClassSequelize } from '../../database/sequelize/ClassSequelize';
import { ValidateCampusManager } from '../../middlewares/campus/ValidateCampusManager';
import { StudentManagementMatchActivitySequelize } from '../../database/sequelize/StudentManagementMatchActivitySequelize';
import { TeacherSequelize } from '../../database/sequelize/TeacherSequelize';
import { TeacherOfDateSequelize } from '../../database/sequelize/TeacherOfDateSequelize';
import { StudentMatchActivitySequelize } from '../../database/sequelize/StudentMatchActivitySequelize';
import { StudentSequelize } from '../../database/sequelize/StudentSequelize';

const BASE_ROUTE = '/classes-offline';

enum Routes {
  REGISTER_CLASS_OFFLINE = '/register',
  REGISTER_STUDENT_IN_CLASS_OFFLINE = '/register-student-inclass',
  UPDATE_CLASS_OFFLINE = '/update',
  FIND_STUDENT_WITH_PRODUCT = '/find-student-with-product-id',
  GET_LIST_CLASS_OFFLINE = '/get-list-class',
  GET_STUDENT_CLASS_OFFLINE = '/get-student-class/:classId',
  CHECK_TIME_STUDENT_OFFLINE = '/check-time-student-offline',
  CHECK_TIME_TEACHER_OFFLINE = '/check-time-teacher-offline',
  REMOVE_STUDENT_IN_CLASS_OFFLINE = '/remove-student-in-class',
  TEACHER_GET_LIST_CLASS_OFFLINE_BY_TEACHER_ID = '/teachers/get-list-class-by-teacher-id',
  TEACHER_GET_CLASS_OFFLINE_BY_CLASS_ID = '/teachers/get-class-by-class-id/:classId'
}

export class ClassRoutes {
  constructor() {}
  private validateValuesMiddleware: ValidateValuesMiddleware = new ValidateValuesMiddleware();
  private studentManagementMatchActivitySequelize: StudentManagementMatchActivitySequelize = new StudentManagementMatchActivitySequelize();
  private studentMatchActivitySequelize: StudentMatchActivitySequelize = new StudentMatchActivitySequelize();
  private validateCampusManager: ValidateCampusManager = new ValidateCampusManager();
  private verifyTokenMiddleware: VerifyTokenMiddleware = new VerifyTokenMiddleware();
  private classSequelize: ClassSequelize = new ClassSequelize();
  private teacherSequelize: TeacherSequelize = new TeacherSequelize();
  private studentSequelize: StudentSequelize = new StudentSequelize();
  private teacherOfDateSequelize: TeacherOfDateSequelize = new TeacherOfDateSequelize();
  private classUseCase: ClassUserCase = new ClassUserCase(
    this.classSequelize,
    this.studentManagementMatchActivitySequelize,
    this.studentMatchActivitySequelize,
    this.teacherSequelize,
    this.studentSequelize,
    this.teacherOfDateSequelize
  );
  private classController: ClassController = new ClassController(this.classUseCase);

  public routes(app: Router): void {
    app.post(
      BASE_ROUTE + Routes.REGISTER_CLASS_OFFLINE,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleCampusManager,
      this.validateCampusManager.validateCampusByUserId,
      this.classController.registerClassOffline
    );
    app.post(
      BASE_ROUTE + Routes.REGISTER_STUDENT_IN_CLASS_OFFLINE,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleCampusManager,
      this.validateCampusManager.validateCampusByUserId,
      this.classController.registerStudentInClassOffline
    );
    app.post(
      BASE_ROUTE + Routes.UPDATE_CLASS_OFFLINE,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleCampusManager,
      this.validateCampusManager.validateCampusByUserId,
      this.classController.updateClassOffline
    );
    app.post(
      BASE_ROUTE + Routes.FIND_STUDENT_WITH_PRODUCT,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleCampusManager,
      this.validateCampusManager.validateCampusByUserId,
      this.classController.findStudentWithProductIds
    );
    app.get(
      BASE_ROUTE + Routes.GET_LIST_CLASS_OFFLINE,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleCampusManager,
      this.validateCampusManager.validateCampusByUserId,
      this.classController.getListClassOffline
    );
    app.get(
      BASE_ROUTE + Routes.GET_STUDENT_CLASS_OFFLINE,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleCampusManager,
      this.validateCampusManager.validateCampusByUserId,
      this.classController.getStudentByIdClassOffline
    );
    app.post(
      BASE_ROUTE + Routes.CHECK_TIME_STUDENT_OFFLINE,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleCampusManager,
      this.validateCampusManager.validateCampusByUserId,
      this.classController.checkTimeDuplicateStudent
    );
    app.post(
      BASE_ROUTE + Routes.CHECK_TIME_TEACHER_OFFLINE,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleCampusManager,
      this.validateCampusManager.validateCampusByUserId,
      this.classController.getListTeacherOff
    );
    app.post(
      BASE_ROUTE + Routes.REMOVE_STUDENT_IN_CLASS_OFFLINE,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleCampusManager,
      this.validateCampusManager.validateCampusByUserId,
      this.classController.removeStudentInClass
    );
    app.get(
      BASE_ROUTE + Routes.TEACHER_GET_LIST_CLASS_OFFLINE_BY_TEACHER_ID,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleTeacher,
      this.validateCampusManager.validateCampusForTeacherId,
      this.classController.getListClassByTeacherId
    );
    app.get(
      BASE_ROUTE + Routes.TEACHER_GET_CLASS_OFFLINE_BY_CLASS_ID,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleTeacher,
      this.validateCampusManager.validateCampusForTeacherId,
      this.classController.teacherGetClassByClassId
    );
  }
}
