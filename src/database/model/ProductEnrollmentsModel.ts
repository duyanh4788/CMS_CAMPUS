import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'product_enrollments'
})
export class ProductEnrollmentsModel extends Model<ProductEnrollmentsModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public productEnrollmentId: number;

  @AllowNull
  @Column
  public productId: number;

  @AllowNull
  @Column
  public enrollmentId: number;

  @AllowNull
  @Column
  public date: Date;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;
}
