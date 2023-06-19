import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'student_class'
})
export class StudentClassModel extends Model<StudentClassModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public studentClassId: number;

  @AllowNull
  @Column
  public studentId: number;

  @AllowNull
  @Column
  public classId: number;

  @Column({ defaultValue: 0 })
  public point: number;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;
}
