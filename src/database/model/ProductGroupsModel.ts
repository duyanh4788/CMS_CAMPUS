import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique, HasOne, BelongsTo, DataType } from 'sequelize-typescript';
import { ProductsModel } from './ProductsModel';

@Table({
  tableName: 'product_groups'
})
export class ProductGroupsModel extends Model<ProductGroupsModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public productGroupId: number;

  @ForeignKey(() => ProductsModel)
  @AllowNull
  @Column
  public productId: number;

  @BelongsTo(() => ProductsModel)
  public products: ProductsModel;

  @Column(DataType.TEXT)
  public groupIds: string;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;
}
