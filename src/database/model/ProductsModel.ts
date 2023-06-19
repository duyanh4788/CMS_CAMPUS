import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique, HasOne, BelongsTo, HasMany } from 'sequelize-typescript';
import { ProductGroupsModel } from './ProductGroupsModel';
import { StudentMatchActivitysModel } from './StudentMatchActivitysModel';

@Table({
  tableName: 'products'
})
export class ProductsModel extends Model<ProductsModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public productId: number;

  @AllowNull
  @Column
  public name: string;

  @AllowNull
  @Column
  public level: string;

  @AllowNull
  @Column
  public details: string;

  @AllowNull
  @Column
  public image: string;

  @AllowNull
  @Column
  public duration: string;

  @AllowNull
  @Column
  public startDate: Date;

  @Column
  public type: string;

  @AllowNull
  @Column
  public category: string;

  @Column({ defaultValue: true })
  public activate: boolean;

  @HasMany(() => StudentMatchActivitysModel)
  studentMatchActivity: StudentMatchActivitysModel;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;

  @HasOne(() => ProductGroupsModel)
  public productGroup: ProductGroupsModel[];
}
