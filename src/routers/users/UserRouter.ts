import { Router } from 'express';
import { UsersController } from '../../controllers/Usercontroller';
import { UserUseCase } from '../../usecase/UserUseCase';
import { UserSequelize } from '../../database/sequelize/UsersSequelize';
import { AuthUserMiddleware } from '../../middlewares/auth/AuthUserMiddleware';
import { VerifyTokenMiddleware } from '../../middlewares/auth/VerifyTokenMiddleware';

const BASE_ROUTE = '/users';

enum Routes {
  LOGIN = '/login',
  PARENT_SIGNUP = '/parent-signup',
  GET_USER_BY_ID = '/get-user-by-id/:userId'
}

export class UsersRoutes {
  private authUserMiddleware: AuthUserMiddleware = new AuthUserMiddleware();
  private verifyTokenMiddleware: VerifyTokenMiddleware = new VerifyTokenMiddleware();
  private userSequelize: UserSequelize = new UserSequelize();
  private userUseCase: UserUseCase = new UserUseCase(this.userSequelize);
  private usersController: UsersController = new UsersController(this.userUseCase);
  constructor() {}

  public routes(app: Router): void {
    app.post(BASE_ROUTE + Routes.LOGIN, this.authUserMiddleware.validateSignIn, this.usersController.userLogin);
    app.post(BASE_ROUTE + Routes.PARENT_SIGNUP, this.authUserMiddleware.validateSignUp, this.usersController.parentSignUp);
    app.get(BASE_ROUTE + Routes.GET_USER_BY_ID, this.verifyTokenMiddleware.auThenticate, this.usersController.getUserById);
  }
}
