import { Request, Response } from 'express';
import { SendRespone } from '../services/success/success';
import { RestError } from '../services/error/error';
import { AdminUseCase } from '../usecase/AdminUseCase';
import { TypeOfValue, isCheckedTypeValues } from '../utils/validate';
import { CampusUseCase } from '../usecase/CampusUseCase';

export class Admincontroller {
  constructor(private adminUseCase: AdminUseCase, private campusUseCase: CampusUseCase) {}

  public adminGetListCampus = async (req: Request, res: Response) => {
    try {
      const listCampus = await this.campusUseCase.adminGetListCampusUseCase(true);
      return new SendRespone({ data: listCampus }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public adminGetListCampusNoneTeacher = async (req: Request, res: Response) => {
    try {
      const listCampus = await this.campusUseCase.adminGetListCampusUseCase(false);
      return new SendRespone({ data: listCampus }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public adminGetCampusById = async (req: Request, res: Response) => {
    try {
      const { campusId } = req.params;
      if (!isCheckedTypeValues(parseInt(campusId), TypeOfValue.NUMBER)) {
        return new SendRespone({ code: 404, message: 'campus id not available!' }).send(res);
      }
      const campus = await this.campusUseCase.adminGetCampusByIdUseCase(parseInt(campusId));
      return new SendRespone({ data: campus }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public adminGetCampusByCMId = async (req: Request, res: Response) => {
    try {
      const { teacherId } = req.params;
      if (!isCheckedTypeValues(parseInt(teacherId), TypeOfValue.NUMBER)) {
        return new SendRespone({ code: 404, message: 'teacher id not available!' }).send(res);
      }
      const campus = await this.campusUseCase.adminGetCampusByCMIdUseCase(parseInt(teacherId));
      return new SendRespone({ data: campus }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public adminCreateCampus = async (req: Request, res: Response) => {
    try {
      await this.campusUseCase.adminCreateCampusUseCase(req.body);
      return new SendRespone({ message: 'create campus successfully!' }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public adminUpdateCampus = async (req: Request, res: Response) => {
    try {
      await this.campusUseCase.adminUpdateCampusUseCase(req.body);
      return new SendRespone({ message: 'update campus successfully!' }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public adminUpdateActiveMultiCampus = async (req: Request, res: Response) => {
    try {
      const { campusIds, activate } = req.body;
      await this.campusUseCase.adminUpdateActiveMultiCampusUseCase(campusIds, activate);
      return new SendRespone({ message: 'update activate campus successfully!' }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
}
