import { Request, Response, NextFunction } from 'express';
import { TypeOfValue, isCheckedTypeValues } from '../../utils/validate';
import { SendRespone } from '../../services/success/success';

export class AuthUserMiddleware {
  constructor() {}

  public async validateSignUp(req: Request, res: Response, next: NextFunction) {
    const { name, email, userName, phone, password } = req.body;
    if (
      !isCheckedTypeValues(name, TypeOfValue.STRING) ||
      !isCheckedTypeValues(email, TypeOfValue.STRING) ||
      (phone && !isCheckedTypeValues(phone, TypeOfValue.NUMBER)) ||
      !isCheckedTypeValues(userName, TypeOfValue.STRING) ||
      !isCheckedTypeValues(password, TypeOfValue.STRING)
    ) {
      return new SendRespone({
        status: 'error',
        code: 404,
        message: 'Please input full information!'
      }).send(res);
    }
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      return new SendRespone({
        status: 'error',
        code: 404,
        message: 'Please input correct type email!'
      }).send(res);
    }
    next();
  }

  public async validateSignIn(req: Request, res: Response, next: NextFunction) {
    const { userName, password } = req.body;
    if ((userName && !isCheckedTypeValues(userName, TypeOfValue.STRING)) || !isCheckedTypeValues(password, TypeOfValue.STRING)) {
      return new SendRespone({ status: 'error', code: 404, message: 'Please input full information!' }).send(res);
    }
    next();
  }
}
