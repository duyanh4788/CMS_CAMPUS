import { CampusInterface } from '../interface/CampusInterface';
import { ICampusRepository } from '../repository/CampusRepository';
import { RestError } from '../services/error/error';
export class CampusUseCase {
  constructor(private campusRepository: ICampusRepository) {}

  async adminGetListCampusUseCase(isTeacher: boolean): Promise<CampusInterface[]> {
    const listCampus = await this.campusRepository.getListCampus(isTeacher);
    return listCampus;
  }

  async adminGetCampusByIdUseCase(campusId: number): Promise<CampusInterface> {
    const campus = await this.campusRepository.getCampusById(campusId);
    if (!campus) {
      throw new RestError('campus not exist!', 404);
    }
    return campus;
  }

  async adminGetCampusByCMIdUseCase(teacherId: number): Promise<CampusInterface> {
    const campus = await this.campusRepository.getCampusByTeacherId(teacherId);
    if (!campus) {
      throw new RestError('campus not exist!', 404);
    }
    return campus;
  }

  async adminCreateCampusUseCase(reqBody: any): Promise<any> {
    const campus = await this.campusRepository.findCampusByName(reqBody.name);
    if (campus) {
      throw new RestError('name campus is exist, please change name!', 404);
    }
    return await this.campusRepository.createCampus(reqBody);
  }

  async adminUpdateCampusUseCase(reqBody: any): Promise<any> {
    const campus = await this.campusRepository.findCampusByName(reqBody.name);
    if (campus && campus.campusId !== reqBody.campusId) {
      throw new RestError('name campus is exist, please change name!', 404);
    }
    return await this.campusRepository.updateCampus(reqBody);
  }

  async adminUpdateActiveMultiCampusUseCase(campusIds: number[], activate: boolean): Promise<any> {
    return await this.campusRepository.updateActiveMultiCampus(campusIds, activate);
  }
}
