import { Op, Transaction } from 'sequelize';
import { CampusInterface } from '../../interface/CampusInterface';
import { UserAttributes, UserRole } from '../../interface/UserInterface';
import { IAdminRepository } from '../../repository/AdminRepository';
import { ICampusRepository } from '../../repository/CampusRepository';
import { CampusModel } from '../model/CampusModel';
import { UsersModel } from '../model/UsersModel';

export class CampusSequelize implements ICampusRepository {
  async createCampus(reqBody: any): Promise<void> {
    const { name, indicated, contact, activate } = reqBody;
    await CampusModel.create({ name, indicated, contact, activate });
    return;
  }

  async findCampusByName(campusName: string): Promise<CampusInterface> {
    const campus = await CampusModel.findOne({ where: { name: campusName } });
    return this.transformModelToEntity(campus);
  }

  async getListCampus(isTeacher: boolean): Promise<CampusInterface[]> {
    const campuss = isTeacher ? await CampusModel.findAll() : await CampusModel.findAll({ where: { teacherId: { [Op.is]: null } } });
    return campuss.map((item) => this.transformModelToEntity(item));
  }

  async getCampusById(campusId: number): Promise<CampusInterface> {
    const campus = await CampusModel.findByPk(campusId);
    return this.transformModelToEntity(campus);
  }

  async getCampusByTeacherId(teacherId: number): Promise<CampusInterface> {
    const campus = await CampusModel.findOne({ where: { teacherId } });
    return this.transformModelToEntity(campus);
  }

  async updateActiveMultiCampus(campusIds: number[], activate: boolean): Promise<void> {
    await Promise.all(
      campusIds.map(async (item) => {
        await CampusModel.update(
          { activate },
          {
            where: {
              campusId: item
            }
          }
        );
      })
    );
    return;
  }

  async updateCampus(reqBody: any): Promise<void> {
    const { campusId, name, indicated, contact, activate } = reqBody;
    await CampusModel.update(
      { name, indicated, contact, activate },
      {
        where: {
          campusId: campusId
        }
      }
    );
    return;
  }

  async updateTeacherId(campusId: number, teacherId: number, transactionDb: Transaction): Promise<void> {
    await CampusModel.update(
      { teacherId },
      {
        where: {
          campusId
        },
        transaction: transactionDb
      }
    );
    return;
  }

  async updateTeacherIdCampus(campusId: number, teacherId: number): Promise<void> {
    await CampusModel.update(
      { teacherId },
      {
        where: {
          campusId
        }
      }
    );
    return;
  }
  /**
   * Transforms database model into domain entity
   * @param model
   */
  private transformModelToEntity(model: CampusModel): CampusInterface {
    if (!model) return;
    const entity: any = {};
    const keysObj = Object.keys(model.dataValues);
    for (let key of keysObj) {
      entity[key] = model[key];
    }
    return entity;
  }
}
