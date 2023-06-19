import { CoursesInterface } from '../interface/CoursesInterface';

export interface ICourseRepository {
  getListCourse(): Promise<CoursesInterface[]>;

  getCourseById(coruseId: number): Promise<CoursesInterface>;

  createdCourse(reqBody: CoursesInterface): Promise<void>;

  updatedCourse(reqBody: CoursesInterface): Promise<void>;
}
