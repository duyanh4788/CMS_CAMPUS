import { RestError } from '../services/error/error';
import { SendRespone } from '../services/success/success';
import { Request, Response } from 'express';
import { CourseUseCase } from '../usecase/CourseUseCase';
import { courses } from '../common/course';

export class CoursesController {
  constructor(private courseUseCase: CourseUseCase) {}

  public createdCourse = async (req: Request, res: Response) => {
    try {
      return new SendRespone({ message: 'created successfully!' }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public updatedCourse = async (req: Request, res: Response) => {
    try {
      await this.courseUseCase.updatedCourseUseCase(req.body);
      return new SendRespone({ message: 'updated successfully!' }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public getListCourse = async (req: Request, res: Response) => {
    try {
      const courses = await this.courseUseCase.getListCourseUseCase();
      return new SendRespone({ data: courses }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public getCourseById = async (req: Request, res: Response) => {
    try {
      const { courseId } = req.params;
      if (!courseId) {
        throw new RestError('course id not available!', 404);
      }
      const course = await this.courseUseCase.getCourseByIdUseCase(parseInt(courseId));
      return new SendRespone({ data: course }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
}
