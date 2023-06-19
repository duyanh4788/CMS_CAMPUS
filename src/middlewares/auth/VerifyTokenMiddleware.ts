import * as JWT from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { SECRETKEY } from '../../common/common.constants';
import { SendRespone } from '../../services/success/success';
import { UserRole } from '../../interface/UserInterface';

export class VerifyTokenMiddleware {
  public auThenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header('Authorization');
      if (!token) {
        return new SendRespone({
          status: 'error',
          code: 401,
          message: 'you have do not sign in!'
        }).send(res);
      }
      const deCode: any = JWT.verify(token as string, SECRETKEY);
      const getTime = Math.round(new Date().getTime() / 1000);
      if (!deCode || (deCode && deCode.exp < getTime)) {
        return new SendRespone({
          status: 'error',
          code: 401,
          message: 'token expired, please login again!'
        }).send(res);
      }
      req.user = deCode;
      return next();
    } catch (error) {
      return new SendRespone({
        status: 'error',
        code: 401,
        message: 'token expired, please login again!'
      }).send(res);
    }
  }

  public permissionsRoleAdmin(req: Request, res: Response, next: NextFunction) {
    const { user }: any = req;
    if (user && user.roleId === UserRole.ADMIN) {
      return next();
    }
    return new SendRespone({
      status: 'error',
      code: 401,
      message: 'you are does not permissions admin!'
    }).send(res);
  }

  public permissionsRoleCampusManager(req: Request, res: Response, next: NextFunction) {
    const { user }: any = req;
    if (user && user.roleId === UserRole.CAMPUS_MANAGER) {
      return next();
    }
    return new SendRespone({
      status: 'error',
      code: 401,
      message: 'you are does not permissions campus!'
    }).send(res);
  }

  public permissionsRoleAdCm(req: Request, res: Response, next: NextFunction) {
    const { user }: any = req;
    if ((user && user.roleId === UserRole.ADMIN) || (user && user.roleId === UserRole.CAMPUS_MANAGER)) {
      return next();
    }
    return new SendRespone({
      status: 'error',
      code: 401,
      message: 'you are does not permissions admin!'
    }).send(res);
  }

  public permissionsRoleTeacher(req: Request, res: Response, next: NextFunction) {
    const { user }: any = req;
    if (user && user.roleId === UserRole.TEACHER) {
      return next();
    }
    return new SendRespone({
      status: 'error',
      code: 401,
      message: 'you are does not permissions teacher!'
    }).send(res);
  }

  public permissionsRoleStudent(req: Request, res: Response, next: NextFunction) {
    const { user }: any = req;
    if (user && user.roleId === UserRole.STUDENT) {
      return next();
    }
    return new SendRespone({
      status: 'error',
      code: 401,
      message: 'you are does not permissions student!'
    }).send(res);
  }

  public permissionsRoleTeacherStudent(req: Request, res: Response, next: NextFunction) {
    const { user }: any = req;
    if ((user && user.roleId === UserRole.TEACHER) || (user && user.roleId === UserRole.STUDENT)) {
      return next();
    }
    return new SendRespone({
      status: 'error',
      code: 401,
      message: 'you are does not permissions teacher or student!'
    }).send(res);
  }
}
