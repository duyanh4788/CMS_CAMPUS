import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique, BelongsTo, DataType, HasMany } from 'sequelize-typescript';
import { StudentsModel } from './StudentsModel';
import { ClassModel } from './ClassModel';
import { StudentMatchActivitysModel } from './StudentMatchActivitysModel';
import { CampusModel } from './CampusModel';
import { TeachersModel } from './TeachersModel';

@Table({
  tableName: 'student_management_matchactivity'
})
export class StudentManagementMatchActivityModel extends Model<StudentManagementMatchActivityModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public studentMnMActivityId: number;

  @ForeignKey(() => StudentsModel)
  @AllowNull
  @Column
  public studentId: number;

  @BelongsTo(() => StudentsModel)
  public students: StudentsModel;

  @ForeignKey(() => TeachersModel)
  @AllowNull
  @Column
  public teacherId: number;

  @BelongsTo(() => TeachersModel)
  public teacher: TeachersModel;

  @Column(DataType.TEXT)
  public productIds: string;

  @Column(DataType.TEXT)
  public dateTimeSlot: string;

  @ForeignKey(() => ClassModel)
  @Column
  public classId: number;
  @BelongsTo(() => ClassModel)
  public class: ClassModel;

  @ForeignKey(() => CampusModel)
  @AllowNull
  @Column
  public campusId: number;

  @BelongsTo(() => CampusModel)
  public campus: CampusModel;

  @CreatedAt
  @Column
  public createdAt: Date;

  @AllowNull
  @Column({ defaultValue: false })
  public expired: boolean;

  @UpdatedAt
  @Column
  public updatedAt: Date;

  @HasMany(() => StudentMatchActivitysModel)
  studentMatchActivity: StudentMatchActivitysModel;
}
