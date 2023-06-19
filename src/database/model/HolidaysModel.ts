import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'holidays'
})
export class HolidaysModel extends Model<HolidaysModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public HolidayId: number;

  @AllowNull
  @Column
  public name: string;

  @AllowNull
  @Column
  public timeZone: string;

  @AllowNull
  @Column
  public startDate: Date;

  @AllowNull
  @Column
  public endDate: Date;

  @AllowNull
  @Column
  public startDay: string;

  @AllowNull
  @Column
  public endDay: string;

  @AllowNull
  @Column
  public duration: number;

  @AllowNull
  @Column
  public campusId: number;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;
}
