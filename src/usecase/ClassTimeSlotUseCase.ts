import { ClassTimeSlotInterface } from '../interface/ClassTimeSlotInterface';
import { IClassTimeSlotRepository } from '../repository/ClassTimeSlotRepository';
import { RestError } from '../services/error/error';

export class ClassTimeSlotUseCase {
  constructor(private classTimeSlotRepository: IClassTimeSlotRepository) {}
  async findAllListsClassTimeSlotUseCase() {
    return await this.classTimeSlotRepository.findAllLists();
  }
  async findClassTimeSlotDetailUseCase(classTimeSlotId: number) {
    const classTimeSlot = await this.classTimeSlotRepository.findById(classTimeSlotId);
    if (!classTimeSlot) {
      throw new RestError('classTimeSlot not found!', 404);
    }
    return classTimeSlot;
  }
  async createClassTimeSlotUseCase(reqBody: ClassTimeSlotInterface) {
    return await this.classTimeSlotRepository.createClassTimeSlot(reqBody);
  }
  async updateClassTimeSlotUseCase(reqBody: ClassTimeSlotInterface) {
    await this.classTimeSlotRepository.updateClassTimeSlot(reqBody);
    return;
  }
  async deleteClassTimeSlotUseCase(classTimeSlotId: number) {
    await this.classTimeSlotRepository.deleteClassTimeSlot(classTimeSlotId);
    return;
  }
}
