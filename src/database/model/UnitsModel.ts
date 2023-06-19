import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'units'
})
export class UnitsModel extends Model<UnitsModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public UnitId: number;

  @AllowNull
  @Column
  public productId: number;

  @AllowNull
  @Column
  public name: string;

  @AllowNull
  @Column
  public startDate: Date;

  @AllowNull
  @Column
  public endDate: Date;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;
}
