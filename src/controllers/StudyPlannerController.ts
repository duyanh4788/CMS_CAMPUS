import { StudentManagementMatchActivityUseCase } from '../usecase/StudentManagementMatchActivityUseCase';
import { Request, Response } from 'express';
import { StudentMatchActivityUseCase } from '../usecase/StudentMatchActivityUseCase';
import { RestError } from '../services/error/error';
import { SendRespone } from '../services/success/success';

export class StudyPlannerController {
  constructor(private studentManagementMatchActivityUseCase: StudentManagementMatchActivityUseCase, private studentMatchActivityUseCase: StudentMatchActivityUseCase) {}

  public getStudentByClassId = async (req: Request, res: Response) => {
    try {
      const { classId } = req.body;
      if (!classId) {
        throw new RestError('class id not available!', 404);
      }
      const students = await this.studentManagementMatchActivityUseCase.getStudentByClassIdUseCase(classId);
      return new SendRespone({ data: students }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public updateStatusStudyPlanner = async (req: Request, res: Response) => {
    try {
      const { studentId, studentMatchActivityId, status } = req.body;
      await this.studentMatchActivityUseCase.updateStatusStudyPlannerUseCase(studentId, studentMatchActivityId, status);
      return new SendRespone({ message: 'update successfully!' }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public getStudentStudyPlanner = async (req: Request, res: Response) => {
    try {
      const { studentId, classId } = req.body;
      if (!studentId || !classId) {
        throw new RestError('student id or class id not available!', 404);
      }
      const studyPlanner = await this.studentManagementMatchActivityUseCase.getStudyPlannerByStudentIdAndClassIdUseCase(parseInt(studentId), parseInt(classId));
      return new SendRespone({ data: studyPlanner }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
}
