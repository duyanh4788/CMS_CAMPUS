import { RestError } from '../services/error/error';
import { SendRespone } from '../services/success/success';
import { ClassTimeSlotUseCase } from '../usecase/ClassTimeSlotUseCase';
import { Request, Response } from 'express';

export class ClassTimeSlotController {
  constructor(private classTimeSlotUseCase: ClassTimeSlotUseCase) {}

  public findAllListsClassTimeSlot = async (req: Request, res: Response) => {
    try {
      const classTimeSlots = await this.classTimeSlotUseCase.findAllListsClassTimeSlotUseCase();
      return new SendRespone({ data: classTimeSlots }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public findClassTimeSlotDetail = async (req: Request, res: Response) => {
    try {
      const classTimeSlot = await this.classTimeSlotUseCase.findClassTimeSlotDetailUseCase(req.body);
      return new SendRespone({ data: classTimeSlot }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public createClassTimeSlot = async (req: Request, res: Response) => {
    try {
      await this.classTimeSlotUseCase.createClassTimeSlotUseCase(req.body);
      return new SendRespone({ message: 'created successfully!' }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public updateClassTimeSlot = async (req: Request, res: Response) => {
    try {
      const classTimeSlot = await this.classTimeSlotUseCase.updateClassTimeSlotUseCase(req.body);
      return new SendRespone({ message: 'updated successfully!' }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public deleteClassTimeSlot = async (req: Request, res: Response) => {
    try {
      const { classTimeSlotId } = req.body;
      await this.classTimeSlotUseCase.deleteClassTimeSlotUseCase(req.body);
      return res.status(200).json({ message: 'delete successfully!' });
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
}
