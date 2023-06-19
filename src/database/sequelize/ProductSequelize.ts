import { Transaction } from 'sequelize';
import { ProductInterface } from '../../interface/ProductInterface';
import { IProductRepository } from '../../repository/ProductRepository';
import { ProductsModel } from '../model/ProductsModel';
import { ProductGroupsModel } from '../model/ProductGroupsModel';
import { GroupsModel } from '../model/GroupsModel';
import { MatchActivitiesModel } from '../model/MatchActivitiesModel';

export class ProductSequelize implements IProductRepository {
  async findAllLists(category: string): Promise<ProductInterface[]> {
    const products = await ProductsModel.findAll({
      where: category && {
        category
      },
      include: ProductGroupsModel
    });
    return products.map((item) => this.transformModelToEntity(item));
  }

  async findById(productId: number): Promise<ProductInterface> {
    const product = await ProductsModel.findByPk(productId, { include: ProductGroupsModel });
    return this.transformModelToEntity(product);
  }

  async createProduct(reqBody: any, transactionDb: Transaction): Promise<ProductInterface> {
    const { name, level, activate, type, category } = reqBody;
    const product = await ProductsModel.create({ name, level, activate, type, category }, { transaction: transactionDb });
    return this.transformModelToEntity(product);
  }

  async updateProduct(reqBody: any): Promise<void> {
    const { productId, name, level, details, activate, type, category } = reqBody;
    await ProductsModel.update(
      { name, level, details, activate, type, category },
      {
        where: {
          productId: productId
        }
      }
    );
    return;
  }

  async updateActivateProduct(productId: number, activate: boolean): Promise<void> {
    await ProductsModel.update(
      { activate },
      {
        where: {
          productId: productId
        }
      }
    );
    return;
  }

  /**
   * Transforms database model into domain entity
   * @param model
   */
  private transformModelToEntity(model: ProductsModel): ProductInterface {
    if (!model) return;
    const entity: any = {};
    const keysObj = Object.keys(model.dataValues);
    for (let key of keysObj) {
      if (key === 'groupIds') {
        entity[key] = JSON.parse(model[key]);
      }
      entity[key] = model[key];
    }
    if (entity.productGroup && entity.productGroup.groupIds) {
      entity.productGroup.groupIds = JSON.parse(entity.productGroup.groupIds);
    }
    return entity;
  }
}
