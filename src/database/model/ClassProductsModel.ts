import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'class_products'
})
export class ClassProductsModel extends Model<ClassProductsModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public classProductId: number;

  @AllowNull
  @Column
  public productId: number;

  @AllowNull
  @Column
  public classId: number;

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
