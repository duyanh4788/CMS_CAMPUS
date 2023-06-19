import { RestError } from '../services/error/error';
import { SendRespone } from '../services/success/success';
import { StudentMatchActivityUseCase } from '../usecase/StudentMatchActivityUseCase';
import { Request, Response } from 'express';

export class StudentMatchActivityController {
  constructor(private studentMatchActivityUseCase: StudentMatchActivityUseCase) {}
  public getListStudentMatchActivityByProductId = async (req: Request, res: Response) => {
    try {
      const { productId } = req.body;
      if (!productId) {
        throw new RestError('product id not available!', 404);
      }
      const studentMatchActivity = await this.studentMatchActivityUseCase.getListStudentMatchActivityByProductIdUseCase(parseInt(productId));
      return new SendRespone({ data: studentMatchActivity }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
}
