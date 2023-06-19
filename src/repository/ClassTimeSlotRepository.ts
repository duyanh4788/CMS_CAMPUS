import { Transaction } from 'sequelize';
import { ClassTimeSlotInterface } from '../interface/ClassTimeSlotInterface';

export interface IClassTimeSlotRepository {
  findAllLists(): Promise<ClassTimeSlotInterface[]>;

  findById(classTimeSlotId: number): Promise<ClassTimeSlotInterface>;

  createClassTimeSlot(reqBody: ClassTimeSlotInterface): Promise<ClassTimeSlotInterface>;

  updateClassTimeSlot(reqBody: any): Promise<void>;

  findByName(name: string): Promise<ClassTimeSlotInterface>;

  deleteClassTimeSlot(classTimeSlotId: number): Promise<void>;
}
