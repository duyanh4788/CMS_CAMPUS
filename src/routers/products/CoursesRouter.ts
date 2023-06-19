import { Router } from 'express';
import { VerifyTokenMiddleware } from '../../middlewares/auth/VerifyTokenMiddleware';
import { CoursesController } from '../../controllers/CoursesController';
import { CourseUseCase } from '../../usecase/CourseUseCase';
import { CoursesSequelize } from '../../database/sequelize/CoursesSequelize';

const BASE_ROUTE = '/courses';

enum Routes {
  GET_LIST_COURSE = '/get-list-course',
  GET_COURSE_BY_ID = '/get-list-course/:courseId',
  CREATED_COURSE = '/created-course',
  UPDATE_COURSE = '/updated-course'
}

export class CoursesRouter {
  constructor() {}
  private verifyTokenMiddleware: VerifyTokenMiddleware = new VerifyTokenMiddleware();
  private coursesRepository: CoursesSequelize = new CoursesSequelize();
  private courseUseCase: CourseUseCase = new CourseUseCase(this.coursesRepository);
  private coursesController: CoursesController = new CoursesController(this.courseUseCase);
  public routes(app: Router): void {
    app.post(BASE_ROUTE + Routes.CREATED_COURSE, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.coursesController.createdCourse);
    app.post(BASE_ROUTE + Routes.UPDATE_COURSE, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.coursesController.updatedCourse);
    app.get(BASE_ROUTE + Routes.GET_LIST_COURSE, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdCm, this.coursesController.getListCourse);
    app.get(BASE_ROUTE + Routes.GET_COURSE_BY_ID, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdCm, this.coursesController.getCourseById);
  }
}
