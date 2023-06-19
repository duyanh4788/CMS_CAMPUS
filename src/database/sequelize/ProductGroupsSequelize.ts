import { Transaction } from 'sequelize';
import { ProductGroupInterface } from '../../interface/ProductGroupsInterface';
import { ProductGroupsModel } from '../model/ProductGroupsModel';
import { RestError } from '../../services/error/error';
import { IProductGroupsRepository } from '../../repository/ProductGroupsRepository';

export class ProductGroupsSequelize implements IProductGroupsRepository {
  async findAllLists(): Promise<ProductGroupInterface[]> {
    const productGroups = await ProductGroupsModel.findAll();
    return productGroups.map((item) => this.transformModelToEntity(item));
  }

  async findById(productGroupId: number): Promise<ProductGroupInterface> {
    const productGroup = await ProductGroupsModel.findOne({ where: { productGroupId } });
    return this.transformModelToEntity(productGroup);
  }

  async createProductGroups(reqBody: any, transactionDb: Transaction): Promise<void> {
    const { productId, groupIds } = reqBody;
    await ProductGroupsModel.create({ productId, groupIds: JSON.stringify(groupIds) }, { transaction: transactionDb });
    return;
  }

  async updateProductGroups(reqBody: any): Promise<void> {
    const { productGroupId, groupIds } = reqBody;
    let productGroup = await ProductGroupsModel.findByPk(productGroupId);
    if (!productGroup) return;
    if (!groupIds.length) throw new RestError('Group Matched Acivity can not empty!', 404);
    productGroup.groupIds = JSON.stringify(groupIds);
    await productGroup.save();
    return;
  }

  async deleteProductGroups(productGroupId: number): Promise<void> {
    await ProductGroupsModel.destroy({ where: { productGroupId } });
    return;
  }

  /**
   * Transforms database model into domain entity
   * @param model
   */
  private transformModelToEntity(model: ProductGroupsModel): ProductGroupInterface {
    if (!model) return;
    const entity: any = {};
    const keysObj = Object.keys(model.dataValues);
    for (let key of keysObj) {
      entity[key] = model[key];
    }
    return entity;
  }
}
