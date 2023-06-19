import { ClassTimeSlotInterface } from '../../interface/ClassTimeSlotInterface';
import { IClassTimeSlotRepository } from '../../repository/ClassTimeSlotRepository';
import { Transaction } from 'sequelize';
import { ClassTimeSlotsModel } from '../model/ClassTimeSlotsModel';
import { RestError } from '../../services/error/error';

export class ClassTimeSlotSequelize implements IClassTimeSlotRepository {
  async findAllLists(): Promise<any> {
    const classTimeSlots = await ClassTimeSlotsModel.findAll();
    return classTimeSlots.map((item) => this.transformModelToEntity(item));
  }

  async findById(classTimeSlotId: number): Promise<any> {
    const classTimeSlot = await ClassTimeSlotsModel.findByPk(classTimeSlotId);
    return this.transformModelToEntity(classTimeSlot);
  }

  async createClassTimeSlot(reqBody: ClassTimeSlotInterface): Promise<ClassTimeSlotInterface> {
    const { name, classStartTime, classEndTime } = reqBody;
    const classStart = this.parseTimeToHHMMSS(classStartTime);
    const classEnd = this.parseTimeToHHMMSS(classEndTime);
    if (classEnd < classStart) throw new RestError('Class end time must be greater than class start time');
    await ClassTimeSlotsModel.create({ name, classStart, classEnd });
    return;
  }

  async updateClassTimeSlot(reqBody: any): Promise<void> {
    const { classTimeSlotId, name, classStartTime, classEndTime } = reqBody;
    const classStart = this.parseTimeToHHMMSS(classStartTime);
    const classEnd = this.parseTimeToHHMMSS(classEndTime);
    if (classEnd < classStart) throw new RestError('Class end time must be greater than class start time');
    await ClassTimeSlotsModel.update(
      { name, classStart, classEnd },
      {
        where: {
          classTimeSlotId: classTimeSlotId
        }
      }
    );
    return;
  }

  async findByName(name: string): Promise<any> {
    const classTimeSlot = await ClassTimeSlotsModel.findOne({ where: { name } });
    return this.transformModelToEntity(classTimeSlot);
  }

  async deleteClassTimeSlot(classTimeSlotId: number): Promise<void> {
    await ClassTimeSlotsModel.destroy({
      where: {
        classTimeSlotId: classTimeSlotId
      }
    });
    return;
  }

  private transformModelToEntity(model: ClassTimeSlotsModel): ClassTimeSlotInterface {
    if (!model) return;
    const entity: any = {};
    const keysObj = Object.keys(model.dataValues);
    for (let key of keysObj) {
      entity[key] = model[key];
    }
    return entity;
  }

  public parseTimeToHHMMSS(time) {
    const [hours, minutes] = time.split(':');
    const seconds = '00'; // Add '00' as seconds
    return `${hours}:${minutes}:${seconds}`;
  }
}
