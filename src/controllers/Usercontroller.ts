import { Request, Response } from 'express';
import { SendRespone } from '../services/success/success';
import { RestError } from '../services/error/error';
import { UserUseCase } from '../usecase/UserUseCase';

export class UsersController {
  constructor(private userUseCase: UserUseCase) {}

  public userLogin = async (req: Request, res: Response) => {
    try {
      const { userName, password } = req.body;
      const token = await this.userUseCase.userLoginUseCase(userName, password);
      return new SendRespone({ data: token, message: 'login successfully!' }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public parentSignUp = async (req: Request, res: Response) => {
    try {
      await this.userUseCase.parentSginUpUseCase(req.body);
      return new SendRespone({ message: 'signup successfully!' }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public getUserById = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        throw new RestError('user id not available!', 404);
      }
      const user = await this.userUseCase.getUserByIdUseCase(userId);
      return new SendRespone({ data: user }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
}
