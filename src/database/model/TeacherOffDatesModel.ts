import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'teacher_off_dates'
})
export class TeacherOffDatesModel extends Model<TeacherOffDatesModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public teacherOffDateId: number;

  @AllowNull
  @Column
  public teacherId: number;

  @AllowNull
  @Column
  public dateOff: Date;

  @Column
  public classTimeSlotId: number;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;
}
