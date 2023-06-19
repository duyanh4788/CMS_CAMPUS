import { Router } from 'express';
import { StudentManagementMatchActivitySequelize } from '../../database/sequelize/StudentManagementMatchActivitySequelize';
import { VerifyTokenMiddleware } from '../../middlewares/auth/VerifyTokenMiddleware';
import { ValidateValuesMiddleware } from '../../middlewares/values/ValidateValues';
import { StudentManagementMatchActivityUseCase } from '../../usecase/StudentManagementMatchActivityUseCase';
import { StudyPlannerController } from '../../controllers/StudyPlannerController';
import { StudentMatchActivitySequelize } from '../../database/sequelize/StudentMatchActivitySequelize';
import { StudentMatchActivityUseCase } from '../../usecase/StudentMatchActivityUseCase';

const BASE_ROUTE = '/study-planner';

enum Routes {
  UPDATE_STUDY_PLANNER_STATUS = '/update-status',
  GET_STUDENT_BY_CLASS_ID = '/get-student-by-class-id',
  GET_STUDENT_STUDY_PLANNER = '/get-student-study-planner'
}

export class StudyPlannerRouter {
  constructor() {}
  private verifyTokenMiddleware: VerifyTokenMiddleware = new VerifyTokenMiddleware();
  private validateValuesMiddleware: ValidateValuesMiddleware = new ValidateValuesMiddleware();
  private studentManagementMatchActivitySequelize: StudentManagementMatchActivitySequelize = new StudentManagementMatchActivitySequelize();
  private studentManagementMatchActivityUseCase: StudentManagementMatchActivityUseCase = new StudentManagementMatchActivityUseCase(this.studentManagementMatchActivitySequelize);
  private studentMatchActivitySequelize: StudentMatchActivitySequelize = new StudentMatchActivitySequelize();
  private studentMatchActivityUseCase: StudentMatchActivityUseCase = new StudentMatchActivityUseCase(this.studentMatchActivitySequelize);
  private studyPlannerController: StudyPlannerController = new StudyPlannerController(this.studentManagementMatchActivityUseCase, this.studentMatchActivityUseCase);
  public routes(app: Router): void {
    app.post(BASE_ROUTE + Routes.GET_STUDENT_BY_CLASS_ID, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleTeacher, this.studyPlannerController.getStudentByClassId);
    app.post(
      BASE_ROUTE + Routes.UPDATE_STUDY_PLANNER_STATUS,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleTeacher,
      this.studyPlannerController.updateStatusStudyPlanner
    );
    app.post(
      BASE_ROUTE + Routes.GET_STUDENT_STUDY_PLANNER,
      this.verifyTokenMiddleware.auThenticate,
      this.verifyTokenMiddleware.permissionsRoleTeacherStudent,
      this.studyPlannerController.getStudentStudyPlanner
    );
  }
}
