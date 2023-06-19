import { Transaction } from 'sequelize';
import { UserAttributes, UserRole } from '../../interface/UserInterface';
import { IUserRepository } from '../../repository/UserRepository';
import { UsersModel } from '../model/UsersModel';

export class UserSequelize implements IUserRepository {
  async findAllLists(): Promise<UserAttributes[]> {
    return [];
  }

  async findById(userId: string): Promise<UserAttributes> {
    const user = await UsersModel.findByPk(userId);
    return this.transformModelToEntity(user);
  }

  async findByEmail(email: string): Promise<UserAttributes> {
    const user = await UsersModel.findOne({ where: { email } });
    return this.transformModelToEntity(user);
  }

  async findByUserName(userName: string): Promise<UserAttributes> {
    const user = await UsersModel.findOne({ where: { userName } });
    return this.transformModelToEntity(user);
  }

  async createUser(name: string, userName: string, email: string, password: string, phone: number, roleId: UserRole, transactionDb?: Transaction): Promise<UserAttributes> {
    const user = await UsersModel.create({ name, userName, email, password, phone, roleId }, transactionDb && { transaction: transactionDb });
    return this.transformModelToEntity(user);
  }

  async updateForienUser(userId: number, id: number, campusId: number, type: string, roleId: UserRole, name?: string, password?: string, transactionDb?: Transaction): Promise<void> {
    let updateData: Partial<UsersModel> = {};
    switch (type) {
      case 'teacherId':
        updateData = { teacherId: id, campusId, roleId };
        break;
      case 'studentId':
        updateData = { studentId: id, campusId, roleId };
        break;
      case 'parentId':
        updateData = { parentId: id, roleId };
        break;
      case 'campusManagerId':
        updateData = { campusManagerId: id, campusId, roleId };
        break;
      default:
        break;
    }
    updateData = { ...updateData, ...(name && { name }), ...(password && { password }) };
    await UsersModel.update(updateData, { where: { userId }, transaction: transactionDb });
    return;
  }

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
