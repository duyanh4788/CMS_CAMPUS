import { Transaction } from 'sequelize';
import { ProductInterface } from '../interface/ProductInterface';

export interface IProductRepository {
  findAllLists(category: string): Promise<ProductInterface[]>;

  findById(productId: number): Promise<ProductInterface>;

  createProduct(reqBody: any, transactionDb: Transaction): Promise<ProductInterface>;

  updateProduct(reqBody: any): Promise<void>;

  updateActivateProduct(productId: number, activate: boolean): Promise<void>;
}
