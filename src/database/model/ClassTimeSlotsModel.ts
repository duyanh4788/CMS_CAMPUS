import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'class_time_slots'
})
export class ClassTimeSlotsModel extends Model<ClassTimeSlotsModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public classTimeSlotId: number;

  @AllowNull
  @Unique
  @Column
  public name: string;

  @AllowNull
  @Column(DataType.TIME)
  public classStart: string;

  @AllowNull
  @Column(DataType.TIME)
  public classEnd: string;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;
}
