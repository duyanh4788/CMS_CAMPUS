import { sequelize } from '../database/sequelize';
import { RestError } from '../services/error/error';
import { SendRespone } from '../services/success/success';
import { ClassReportUseCase } from '../usecase/ClassReportUseCase';
import { StudentManagementMatchActivityUseCase } from '../usecase/StudentManagementMatchActivityUseCase';
import { StudentMatchActivityUseCase } from '../usecase/StudentMatchActivityUseCase';
import { TeacherUseCase } from '../usecase/TeacherUseCase';
import { Request, Response } from 'express';

export class TeacherController {
  constructor(
    private teacherUseCase: TeacherUseCase,
    private studentManagementMatchActivityUseCase: StudentManagementMatchActivityUseCase,
    private studentMatchActivityUseCase: StudentMatchActivityUseCase,
    private classReportUseCase: ClassReportUseCase
  ) {}

  public createTeacher = async (req: Request, res: Response) => {
    const transactionDb = await sequelize.transaction();
    try {
      const { user } = req;
      await this.teacherUseCase.createTeacherUseCase(user, req.body, transactionDb);
      await transactionDb.commit();
      return new SendRespone({ message: 'created successfully!' }).send(res);
    } catch (error) {
      await transactionDb.rollback();
      return RestError.manageServerError(res, error, false);
    }
  };
  public updateTeacher = async (req: Request, res: Response) => {
    try {
      await this.teacherUseCase.updateTeacherUseCase(req.body);
      return new SendRespone({ message: 'update successfully!' }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
  public updateMultiActivateTeacher = async (req: Request, res: Response) => {
    try {
      const { teacherIds } = req.body;
      await this.teacherUseCase.updateMultiActivateUseCase(teacherIds);
      return new SendRespone({ message: 'update activated successfully!' }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
  public getAllListTeachers = async (req: Request, res: Response) => {
    try {
      const teachers = await this.teacherUseCase.getAllListTeachersUseCase();
      return new SendRespone({ data: teachers }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
  public getListTeachersOffline = async (req: Request, res: Response) => {
    try {
      const { user } = req;
      const teachers = await this.teacherUseCase.getListTeachersOfflineUseCase(user.campusId, user.userId);
      return new SendRespone({ data: teachers }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
  public getTeacherById = async (req: Request, res: Response) => {
    try {
      const { teacherId } = req.params;
      if (!teacherId) {
        throw new RestError('teacher id not available!', 404);
      }
      const { user } = req;
      const product = await this.teacherUseCase.getTeacherByIdUseCase(user.campusId, parseInt(teacherId));
      return new SendRespone({ data: product }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public createClassReport = async (req: Request, res: Response) => {
    try {
      await this.classReportUseCase.createClassReportUseCase(req.body);
      return new SendRespone({ message: 'created successfully!' }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
}
