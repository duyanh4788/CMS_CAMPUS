import { ClassUserCase } from '../usecase/ClassUseCase';
import { Request, Response } from 'express';
import { RestError } from '../services/error/error';
import { SendRespone } from '../services/success/success';
import { sequelize } from '../database/sequelize';
import { TypeOfValue, isCheckedTypeValues } from '../utils/validate';

export class ClassController {
  constructor(private classUseCase: ClassUserCase) {}

  public registerClassOffline = async (req: Request, res: Response) => {
    const transactionDb = await sequelize.transaction();
    try {
      const { studentList } = req.body;
      if (!studentList) {
        throw new RestError('student not available!', 404);
      }
      await this.classUseCase.registerClassOfflineUseCase(req.body, transactionDb);
      await transactionDb.commit();
      return new SendRespone({ message: 'register successfully!' }).send(res);
    } catch (error) {
      await transactionDb.rollback();
      return RestError.manageServerError(res, error, false);
    }
  };

  public registerStudentInClassOffline = async (req: Request, res: Response) => {
    const transactionDb = await sequelize.transaction();
    try {
      const { studentList } = req.body;
      if (!studentList) {
        throw new RestError('student not available!', 404);
      }
      await this.classUseCase.registerStudentInClassUseCase(req.body, transactionDb);
      await transactionDb.commit();
      return new SendRespone({ message: 'register successfully!' }).send(res);
    } catch (error) {
      await transactionDb.rollback();
      return RestError.manageServerError(res, error, false);
    }
  };

  public updateClassOffline = async (req: Request, res: Response) => {
    try {
      // const product = await this.classUseCase.updateClassOfflineUseCase(req.body);
      return new SendRespone({ message: 'update successfully!' }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public findStudentWithProductIds = async (req: Request, res: Response) => {
    try {
      const { productIds } = req.body;
      if (!productIds || !productIds.length) {
        throw new RestError('product id not available!', 404);
      }
      const students = await this.classUseCase.findStudentWithProductIdsUseCase(productIds);
      return new SendRespone({ data: students }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public checkTimeDuplicateStudent = async (req: Request, res: Response) => {
    try {
      const { studentIds, dateTimeSlot } = req.body;
      if (!studentIds || !studentIds.length || !dateTimeSlot || !dateTimeSlot.length) {
        throw new RestError('value not available', 404);
      }
      const students = await this.classUseCase.checkTimeDuplicateStudentUseCase(studentIds, dateTimeSlot);
      return new SendRespone({ data: students }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public getListTeacherOff = async (req: Request, res: Response) => {
    try {
      const { user } = req;
      const { dateTimeSlot, classStartDate } = req.body;
      if (!dateTimeSlot || !dateTimeSlot.length) {
        throw new RestError('value input not available', 400);
      }
      const payload = {
        userId: user.userId,
        campusId: user.campusId,
        dateTimeSlot,
        classStartDate
      };
      const teachers = await this.classUseCase.getListTeacherOffUseCase(payload);
      return new SendRespone({ data: teachers }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public getListClassOffline = async (req: Request, res: Response) => {
    try {
      const { user } = req;
      const classOffline = await this.classUseCase.getListClassOfflineUseCase(user.campusId);
      return new SendRespone({ data: classOffline }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public getStudentByIdClassOffline = async (req: Request, res: Response) => {
    try {
      const { classId } = req.params;
      if (!classId) {
        throw new RestError('class id not available', 404);
      }
      const classOffline = await this.classUseCase.getStudentByIdClassOfflineUseCase(parseInt(classId));
      return new SendRespone({ data: classOffline }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public removeStudentInClass = async (req: Request, res: Response) => {
    const transactionDb = await sequelize.transaction();
    try {
      const { classId, studentIds } = req.body;
      if (!classId || !studentIds || !studentIds.length) {
        throw new RestError('value input not avalilable!', 404);
      }
      await this.classUseCase.removeStudentInClassUseCase(req.body, transactionDb);
      await transactionDb.commit();
      return new SendRespone({ message: 'remove successfully!' }).send(res);
    } catch (error) {
      await transactionDb.rollback();
      return RestError.manageServerError(res, error, false);
    }
  };

  public getListClassByTeacherId = async (req: Request, res: Response) => {
    try {
      const { user } = req;
      const classes = await this.classUseCase.getListClassByTeacherId(user.teacherId, user.campusId);
      return new SendRespone({ data: classes }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public teacherGetClassByClassId = async (req: Request, res: Response) => {
    try {
      const { classId } = req.params;
      const { user } = req;
      if (!classId || !isCheckedTypeValues(parseInt(classId), TypeOfValue.NUMBER, true)) {
        throw new RestError('teacher id not avalilable!', 404);
      }
      const classes = await this.classUseCase.getClassByTeacherId(parseInt(classId), user.teacherId);
      return new SendRespone({ data: classes }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
}
