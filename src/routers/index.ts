import { Router } from 'express';
import { UsersRoutes } from './users/UserRouter';
import { AdminRouter } from './admin/AdminRouter';
import { GroupRoutes } from './products/GroupRouter';
import { TeacherRoutes } from './teachers/TeacherRouter';
import { CoursesRouter } from './products/CoursesRouter';
import { MatchActivityRoutes } from './products/MatchActivityRouter';
import { ProductRoutes } from './products/ProductRouter';
import { StudentRoutes } from './students/StudentRouter';
import { ClassTimeSlotRouter } from './classes/ClassTimeSlotRouter';
import { ClassRoutes } from './classes/ClassRouter';
import { StudyPlannerRouter } from './study_planner/StudyPlannerRouter';
export class Routers {
  public usersRoutes: UsersRoutes = new UsersRoutes();
  public adminRouter: AdminRouter = new AdminRouter();
  public groupRoutes: GroupRoutes = new GroupRoutes();
  public MatchActivityRoutes: MatchActivityRoutes = new MatchActivityRoutes();
  public teacherRoutes: TeacherRoutes = new TeacherRoutes();
  public coursesRouter: CoursesRouter = new CoursesRouter();
  public productRoutes: ProductRoutes = new ProductRoutes();
  public studentRoutes: StudentRoutes = new StudentRoutes();
  public classTimeSlotRouter: ClassTimeSlotRouter = new ClassTimeSlotRouter();
  public classRoutes: ClassRoutes = new ClassRoutes();
  public studyPlannerRouter: StudyPlannerRouter = new StudyPlannerRouter();

  public routes(app: Router): Router {
    this.usersRoutes.routes(app);
    this.adminRouter.routes(app);
    this.groupRoutes.routes(app);
    this.MatchActivityRoutes.routes(app);
    this.teacherRoutes.routes(app);
    this.coursesRouter.routes(app);
    this.productRoutes.routes(app);
    this.studentRoutes.routes(app);
    this.classTimeSlotRouter.routes(app);
    this.classRoutes.routes(app);
    this.studyPlannerRouter.routes(app);
    return Router();
  }
}
