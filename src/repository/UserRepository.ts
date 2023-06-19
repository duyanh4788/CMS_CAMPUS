import { Transaction } from 'sequelize';
import { UserAttributes, UserRole } from '../interface/UserInterface';

export interface IUserRepository {
  findAllLists(): Promise<UserAttributes[]>;

  findById(userId: string): Promise<UserAttributes>;

  findByEmail(email: string): Promise<UserAttributes>;

  findByUserName(userName: string): Promise<UserAttributes>;

  createUser(name: string, userName: string, email: string, password: string, phone: number, roleId: UserRole, transactionDb?: Transaction): Promise<UserAttributes>;

  updateForienUser(userId: number, id: number, campusId: number, type: string, roleId: UserRole, name?: string, password?: string, transactionDb?: Transaction): Promise<void>;
}