import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'parents'
})
export class ParentsModel extends Model<ParentsModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public parentId: number;

  @AllowNull
  @Column
  public firstName: string;

  @AllowNull
  @Column
  public lastName: string;

  @AllowNull
  @Column
  public email: string;

  @Column
  public phone: string;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;
}
