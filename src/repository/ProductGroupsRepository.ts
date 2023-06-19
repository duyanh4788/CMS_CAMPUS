import { Transaction } from 'sequelize';
import { ProductGroupInterface } from '../interface/ProductGroupsInterface';

export interface IProductGroupsRepository {
  findAllLists(): Promise<ProductGroupInterface[]>;

  findById(productGroupId: number): Promise<ProductGroupInterface>;

  createProductGroups(reqBody: any, transactionDb: Transaction): Promise<void>;

  updateProductGroups(reqBody: any): Promise<void>;

  deleteProductGroups(productGroupId: number): Promise<void>;
}
