import { ClassInterface } from '../../interface/ClassInterface';
import { IClassRepository } from '../../repository/ClassRepository';
import { ClassModel } from '../model/ClassModel';
import { Op, Transaction } from 'sequelize';
import { TeachersModel } from '../model/TeachersModel';
import { StudentsModel } from '../model/StudentsModel';
import { StudentManagementMatchActivityModel } from '../model/StudentManagementMatchActivityModel';
import { formatYearMonthDate } from '../../utils/parseNewDate';
import { validateTimeSlots } from '../../utils/handlerArray';

export class ClassSequelize implements IClassRepository {
  async findAllLists(campusId: number): Promise<ClassInterface[]> {
    const classes = await ClassModel.findAll({ where: { campusId }, include: [{ model: TeachersModel, attributes: ['name'] }] });
    return classes.map((item) => this.transformModelToEntity(item));
  }

  async findById(classId): Promise<ClassInterface> {
    const classes = await ClassModel.findByPk(classId, {
      include: [
        { model: TeachersModel, attributes: ['teacherId', 'name'] },
        { model: StudentManagementMatchActivityModel, attributes: ['studentId'] }
      ]
    });
    return this.transformModelToEntity(classes);
  }

  async createClass(reqBody: ClassInterface, numberStudent: number, transactionDb: Transaction): Promise<ClassInterface> {
    const { campusId, teacherId, productIds, name, level, numberOfStudent, classStartDate, classEndDate, dateTimeSlot, statusUnit, typeOfClass, initialTextbook, category } = reqBody;
    const newClass = await ClassModel.create(
      {
        campusId,
        teacherId,
        productIds: JSON.stringify(productIds),
        name,
        level,
        numberOfStudent,
        availableNumStudent: numberStudent,
        classStartDate: formatYearMonthDate(classStartDate),
        classEndDate: formatYearMonthDate(classEndDate),
        dateTimeSlot: JSON.stringify(dateTimeSlot),
        statusUnit,
        typeOfClass,
        initialTextbook,
        category
      },
      transactionDb && { transaction: transactionDb }
    );
    return this.transformModelToEntity(newClass);
  }

  async updateClass(reqBody: ClassInterface): Promise<ClassInterface> {
    const { classId, name, level, numberOfStudent, availableNumStudent, teacherId, classStartDate, classEndDate, typeOfClass, initialTextbook, category, expired, campusId } = reqBody;
    let classObj = await ClassModel.findByPk(classId);
    if (!classObj) return;
    classObj.name = name;
    classObj.teacherId = teacherId;
    classObj.level = level;
    classObj.numberOfStudent = numberOfStudent;
    classObj.availableNumStudent = availableNumStudent;
    classObj.classStartDate = formatYearMonthDate(classStartDate);
    classObj.classEndDate = formatYearMonthDate(classEndDate);
    classObj.typeOfClass = typeOfClass;
    classObj.initialTextbook = initialTextbook;
    classObj.category = category;
    classObj.expired = expired;
    classObj.campusId = campusId;
    await classObj.save();
    return;
  }
  async deleteClass(classId: number): Promise<ClassInterface> {
    return;
  }

  async updateAvailableNumStudent(classId: number, value: number, type: string, transactionDb: Transaction): Promise<void> {
    const classModel = await ClassModel.findByPk(classId);
    if (type === 'DECR') {
      await classModel.decrement('availableNumStudent', { by: value, transaction: transactionDb });
    }
    if (type === 'INCR') {
      await classModel.increment('availableNumStudent', { by: value, transaction: transactionDb });
    }
    return;
  }

  async findTeacherInDate(teacherId: number, dateTimeSlot: any[]): Promise<boolean> {
    const classes = await ClassModel.findAll({
      where: {
        teacherId,
        expired: false
      }
    });
    for (let item of classes) {
      if (item.dateTimeSlot) {
        if (!validateTimeSlots(JSON.parse(item.dateTimeSlot), dateTimeSlot)) {
          return false;
        }
      }
    }
    return true;
  }

  async getListClassByTeacherId(teacherId: number, campusId: number): Promise<ClassInterface[]> {
    const classes = await ClassModel.findAll({
      where: {
        teacherId,
        campusId
      }
    });
    return classes.map((item) => this.transformModelToEntity(item));
  }

  /**
   * Transforms database model into domain entity
   * @param model
   */
  private transformModelToEntity(model: ClassModel): ClassInterface {
    if (!model) return;
    const entity: any = {};
    const keysObj = Object.keys(model.dataValues);
    for (let key of keysObj) {
      entity[key] = model[key];
    }
    if (entity.productIds) {
      entity.productIds = JSON.parse(entity.productIds);
    }
    if (entity.dateTimeSlot) {
      entity.dateTimeSlot = JSON.parse(entity.dateTimeSlot);
    }
    return entity;
  }
}
