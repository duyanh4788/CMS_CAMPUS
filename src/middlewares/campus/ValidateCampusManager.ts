import { Request, Response, NextFunction } from 'express';
import { SendRespone } from '../../services/success/success';
import { UserRole } from '../../interface/UserInterface';
import { UserSequelize } from '../../database/sequelize/UsersSequelize';

export class ValidateCampusManager {
  constructor() {}
  public async validateCampusByUserId(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    if (!user) {
      return new SendRespone({
        status: 'error',
        code: 404,
        message: 'user not available'
      }).send(res);
    }
    if (user.roleId === UserRole.ADMIN) {
      next();
      return;
    }
    const userRepository = new UserSequelize();
    const userModel = await userRepository.findById(user.userId);
    if (!userModel) {
      return new SendRespone({
        status: 'error',
        code: 404,
        message: 'user not available'
      }).send(res);
    }
    if (!userModel.campusManagerId || !userModel.campusId) {
      return new SendRespone({
        status: 'error',
        code: 404,
        message: 'you are not a campus manager'
      }).send(res);
    }
    req.user.campusId = userModel.campusId;
    next();
  }

  public async validateCampusForTeacherId(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    if (!user) {
      return new SendRespone({
        status: 'error',
        code: 404,
        message: 'user not available'
      }).send(res);
    }
    if (user.roleId === UserRole.ADMIN) {
      next();
      return;
    }
    const userRepository = new UserSequelize();
    const userModel = await userRepository.findById(user.userId);
    if (!userModel) {
      return new SendRespone({
        status: 'error',
        code: 404,
        message: 'user not available'
      }).send(res);
    }
    if (!userModel.teacherId || !userModel.campusId) {
      return new SendRespone({
        status: 'error',
        code: 404,
        message: 'you are not a teacher'
      }).send(res);
    }
    const { teacherId: teacherIdParams } = req.params;
    const { teacherId: teacherIdBody } = req.body;
    if ((teacherIdParams && userModel.teacherId !== parseInt(teacherIdParams)) || (teacherIdBody && userModel.teacherId !== teacherIdBody)) {
      return new SendRespone({
        status: 'error',
        code: 404,
        message: 'id teacher can not for you!'
      }).send(res);
    }
    req.user.teacherId = userModel.teacherId;
    req.user.campusId = userModel.campusId;
    next();
  }
}
