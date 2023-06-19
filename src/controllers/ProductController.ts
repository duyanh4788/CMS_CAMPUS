import { sequelize } from '../database/sequelize';
import { ProductCategory } from '../interface/ProductInterface';
import { RestError } from '../services/error/error';
import { SendRespone } from '../services/success/success';
import { ProductUseCase } from '../usecase/ProductUseCase';
import { Request, Response } from 'express';

export class ProductController {
  constructor(private productUseCase: ProductUseCase) {}

  public createProduct = async (req: Request, res: Response) => {
    const transactionDb = await sequelize.transaction();
    try {
      await this.productUseCase.createProductUseCase(req.body, transactionDb);
      await transactionDb.commit();
      return new SendRespone({ message: 'created successfully!' }).send(res);
    } catch (error) {
      await transactionDb.rollback();
      return RestError.manageServerError(res, error, false);
    }
  };
  public updateProduct = async (req: Request, res: Response) => {
    try {
      await this.productUseCase.updateProductUseCase(req.body);
      return new SendRespone({ message: 'update successfully!' }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
  public updateActivateProduct = async (req: Request, res: Response) => {
    try {
      const { productIds, activate } = req.body;
      await this.productUseCase.updateActivateProductUseCase(productIds, activate);
      return new SendRespone({ message: 'update successfully!' }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public getListProducts = async (req: Request, res: Response) => {
    try {
      const products = await this.productUseCase.getListProductsUseCase(ProductCategory.ALL);
      return new SendRespone({ data: products }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public getListProductsOnline = async (req: Request, res: Response) => {
    try {
      const products = await this.productUseCase.getListProductsUseCase(ProductCategory.ONLINE);
      return new SendRespone({ data: products }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public getListProductsOffline = async (req: Request, res: Response) => {
    try {
      const products = await this.productUseCase.getListProductsUseCase(ProductCategory.OFFLINE);
      return new SendRespone({ data: products }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public getProductById = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      if (!productId) {
        throw new RestError('params not available', 404);
      }
      const product = await this.productUseCase.getProductByIdUseCase(parseInt(productId));
      return new SendRespone({ data: product }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
}
