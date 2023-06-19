import { CoursesInterface } from '../../interface/CoursesInterface';
import { ICourseRepository } from '../../repository/CourseRepository';
import { CoursesModel } from '../model/CoursesModel';

export class CoursesSequelize implements ICourseRepository {
  async getListCourse(): Promise<CoursesInterface[]> {
    const courses = await CoursesModel.findAll();
    return courses.map((item) => this.transformModelToEntity(item));
  }
  async getCourseById(coruseId: number): Promise<CoursesInterface> {
    const course = await CoursesModel.findByPk(coruseId);
    return this.transformModelToEntity(course);
  }
  async createdCourse(reqBody: CoursesInterface): Promise<void> {
    const { level, course, unit } = reqBody;
    await CoursesModel.create({ level, course, unit });
    return;
  }
  async updatedCourse(reqBody: CoursesInterface): Promise<void> {
    const { courseId, level, course, unit } = reqBody;
    await CoursesModel.update({ level, course, unit }, { where: { courseId } });
    return;
  }

  /**
   * Transforms database model into domain entity
   * @param model
   */
  private transformModelToEntity(model: CoursesModel): CoursesInterface {
    if (!model) return;
    const entity: any = {};
    const keysObj = Object.keys(model.dataValues);
    for (let key of keysObj) {
      entity[key] = model[key];
    }
    return entity;
  }
}
