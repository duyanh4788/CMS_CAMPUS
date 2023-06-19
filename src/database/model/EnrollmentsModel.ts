import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'enrollments'
})
export class EnrollmentsModel extends Model<EnrollmentsModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public enrollmentId: number;

  @Column
  public talkSamId: string;

  @AllowNull
  @Column
  public campusId: number;

  @AllowNull
  @Column
  public status: string;

  @Column
  public level: string;

  @Column
  public subject: string;

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
