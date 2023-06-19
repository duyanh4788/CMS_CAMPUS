import { Router } from 'express';
import { ProductUseCase } from '../../usecase/ProductUseCase';
import { ProductController } from '../../controllers/ProductController';
import { ProductSequelize } from '../../database/sequelize/ProductSequelize';
import { VerifyTokenMiddleware } from '../../middlewares/auth/VerifyTokenMiddleware';
import { ProductGroupsSequelize } from '../../database/sequelize/ProductGroupsSequelize';
import { GroupSequelize } from '../../database/sequelize/GroupSequelize';

const BASE_ROUTE = '/products';

enum Routes {
  CREATE_PRODUCT = '/create-product',
  UPDATE_PRODUCT = '/update-product',
  UPDATE_ACTIVATE_PRODUCT = '/update-activate-product',
  GET_LIST_PRODUCT = '/get-list-product',
  GET_PRODUCT_BY_ID = '/get-product-by-id/:productId',
  GET_LIST_PRODUCT_ONLINE = '/get-list-product-online',
  GET_LIST_PRODUCT_OFFLINE = '/get-list-product-offline'
}

export class ProductRoutes {
  constructor() {}
  private verifyTokenMiddleware: VerifyTokenMiddleware = new VerifyTokenMiddleware();
  private groupSequelize: GroupSequelize = new GroupSequelize();
  private productSequelize: ProductSequelize = new ProductSequelize();
  private productGroupsSequelize: ProductGroupsSequelize = new ProductGroupsSequelize();
  private productUseCase: ProductUseCase = new ProductUseCase(this.productSequelize, this.productGroupsSequelize, this.groupSequelize);
  private productController: ProductController = new ProductController(this.productUseCase);

  public routes(app: Router): void {
    app.post(BASE_ROUTE + Routes.CREATE_PRODUCT, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.productController.createProduct);
    app.post(BASE_ROUTE + Routes.UPDATE_PRODUCT, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.productController.updateProduct);
    app.post(BASE_ROUTE + Routes.UPDATE_ACTIVATE_PRODUCT, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.productController.updateActivateProduct);
    app.get(BASE_ROUTE + Routes.GET_LIST_PRODUCT, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdCm, this.productController.getListProducts);
    app.get(BASE_ROUTE + Routes.GET_LIST_PRODUCT_OFFLINE, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdCm, this.productController.getListProductsOffline);
    app.get(BASE_ROUTE + Routes.GET_LIST_PRODUCT_ONLINE, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.productController.getListProductsOnline);
    app.get(BASE_ROUTE + Routes.GET_PRODUCT_BY_ID, this.verifyTokenMiddleware.auThenticate, this.verifyTokenMiddleware.permissionsRoleAdmin, this.productController.getProductById);
  }
}
