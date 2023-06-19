import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'packages'
})
export class PackagesModel extends Model<PackagesModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public packageId: number;

  @AllowNull
  @Column
  public name: string;

  @AllowNull
  @Column
  public startLevel: string;

  @AllowNull
  @Column
  public endLevel: string;

  @Column
  public details: string;

  @Column({ defaultValue: true })
  public activate: boolean;

  @AllowNull
  @Column
  public submittedDate: Date;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;
}
