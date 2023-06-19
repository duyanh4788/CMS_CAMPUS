import { CoursesInterface } from '../interface/CoursesInterface';
import { ICourseRepository } from '../repository/CourseRepository';
import { RestError } from '../services/error/error';

export class CourseUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async createdCourseUseCase(reqBody: CoursesInterface) {
    return await this.courseRepository.createdCourse(reqBody);
  }

  async updatedCourseUseCase(reqBody: CoursesInterface) {
    return await this.courseRepository.updatedCourse(reqBody);
  }

  async getListCourseUseCase() {
    return await this.courseRepository.getListCourse();
  }

  async getCourseByIdUseCase(coruseId: number) {
    const course = await this.courseRepository.getCourseById(coruseId);
    if (!course) {
      throw new RestError('course not found', 404);
    }
    return course;
  }
}
