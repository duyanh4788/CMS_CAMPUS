import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'student_enrollments'
})
export class StudentEnrollmentsModel extends Model<StudentEnrollmentsModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public studentEnrollmentId: number;

  @AllowNull
  @Column
  public studentId: number;

  @AllowNull
  @Column
  public enrollmentId: number;

  @AllowNull
  @Column
  public date: Date;

  @Column({ defaultValue: false })
  public check: boolean;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;
}
