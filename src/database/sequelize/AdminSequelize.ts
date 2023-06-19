import { UserAttributes, UserRole } from '../../interface/UserInterface';
import { IAdminRepository } from '../../repository/AdminRepository';
import { UsersModel } from '../model/UsersModel';

export class AdminSequelize implements IAdminRepository {
  /**
   * Transforms database model into domain entity
   * @param model
   */
  private transformModelToEntity(model: UsersModel): UserAttributes {
    if (!model) return;
    const entity: any = {};
    const keysObj = Object.keys(model.dataValues);
    for (let key of keysObj) {
      entity[key] = model[key];
    }
    return entity;
  }
}
