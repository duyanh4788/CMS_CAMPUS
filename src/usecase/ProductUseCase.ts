import { Transaction } from 'sequelize';
import { IProductGroupsRepository } from '../repository/ProductGroupsRepository';
import { IProductRepository } from '../repository/ProductRepository';
import { RestError } from '../services/error/error';
import { IGroupRepository } from '../repository/GroupRepository';
import { loopListMatchAct, reduceListMatchAct } from '../utils/handlerArray';

export class ProductUseCase {
  constructor(private productRepository: IProductRepository, private productGroupsRepository: IProductGroupsRepository, private groupRepository: IGroupRepository) {}

  async createProductUseCase(reqBody: any, transactionDb: Transaction) {
    const product = await this.productRepository.createProduct(reqBody, transactionDb);
    const { groupIds } = reqBody;
    await this.productGroupsRepository.createProductGroups({ productId: product.productId, groupIds }, transactionDb);
    return;
  }

  async updateProductUseCase(reqBody: any) {
    await this.productRepository.updateProduct(reqBody);
    await this.productGroupsRepository.updateProductGroups(reqBody);
    return;
  }

  async updateActivateProductUseCase(productIds: number[], activate: boolean) {
    await Promise.all(
      productIds.map(async (item) => {
        await this.productRepository.updateActivateProduct(item, activate);
      })
    );
    return;
  }

  async getListProductsUseCase(category: string) {
    return await this.productRepository.findAllLists(category);
  }
  async getProductByIdUseCase(productId: number) {
    return await this.productRepository.findById(productId);
  }

  async matchProductMatchAcitivtyStudent(productIds: number[]) {
    const prodGroups = await this.findGroupIdInProduct(productIds);
    const prodMatchActs = await this.findMatchActivityInGroup(prodGroups);
    const prodGroupsReduce = reduceListMatchAct(prodMatchActs);
    const loopListMatatcs = loopListMatchAct(prodGroupsReduce);
    return loopListMatatcs;
  }

  private async findGroupIdInProduct(productIds: number[]) {
    let result = [];
    await Promise.all(
      productIds.map(async (item) => {
        const product = await this.productRepository.findById(item);
        if (!product) {
          throw new RestError(`prodcut id: ${item} not available`, 404);
        }
        if (product.productGroup.groupIds.length) {
          result.push({ productId: item, groupIds: product.productGroup.groupIds });
        }
      })
    );
    if (!result || !result.length) {
      throw new RestError('prodcut or group prodcut not available', 400);
    }
    return result;
  }

  private async findMatchActivityInGroup(prodGroups: any[]) {
    const matcs = [];
    await Promise.all(
      prodGroups.map(async (itemProd) => {
        const matchAtc = await Promise.all(
          itemProd.groupIds.map(async (itemGroup) => {
            const matc = await this.groupRepository.findById(itemGroup, true);
            if (matc) {
              matcs.push({ productId: itemProd.productId, groups: matc });
            }
          })
        );
        return matchAtc;
      })
    );
    return matcs;
  }
}
