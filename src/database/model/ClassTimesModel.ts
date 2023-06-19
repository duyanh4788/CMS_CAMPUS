import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'class_times'
})
export class ClassTimesModel extends Model<ClassTimesModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public classTimeId: number;

  @AllowNull
  @Column
  public classId: number;

  @AllowNull
  @Column
  public date: Date;

  @AllowNull
  @Column
  public classTimeSlotId: number;

  @AllowNull
  @Column
  public classStartDate: Date;

  @AllowNull
  @Column
  public classEndDate: Date;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;
}
