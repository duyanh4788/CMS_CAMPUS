import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'class_holidays'
})
export class ClassHolidaysModel extends Model<ClassHolidaysModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public classHolidayId: number;

  @AllowNull
  @Column
  public classId: number;

  @AllowNull
  @Column
  public holidayId: number;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;
}
