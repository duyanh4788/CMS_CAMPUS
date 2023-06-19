import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'product_packages'
})
export class ProductPackagesModel extends Model<ProductPackagesModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public productPackageId: number;

  @AllowNull
  @Column
  public productId: number;

  @AllowNull
  @Column
  public packageId: number;

  @AllowNull
  @Column
  public status: string;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;
}
