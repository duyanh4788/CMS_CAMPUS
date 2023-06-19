import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique, HasMany } from 'sequelize-typescript';
import { TeachersModel } from './TeachersModel';
import { StudentManagementMatchActivityModel } from './StudentManagementMatchActivityModel';
import { ClassModel } from './ClassModel';
import { ClassFeedbacksModel } from './ClassFeedbacksModel';
import { ClassReportsModel } from './ClassReportsModel';

@Table({
  tableName: 'campus'
})
export class CampusModel extends Model<CampusModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public campusId: number;

  @ForeignKey(() => TeachersModel)
  @AllowNull
  @Column
  public teacherId: number;

  @HasMany(() => TeachersModel)
  teachers: TeachersModel;

  @AllowNull
  @Unique
  @Column
  public name: string;

  @AllowNull
  @Column
  public indicated: string;

  @AllowNull
  @Column
  public contact: string;

  @Column({ defaultValue: true })
  public activate: boolean;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;

  @HasMany(() => StudentManagementMatchActivityModel)
  studentManagementMatchactivity: StudentManagementMatchActivityModel;

  @HasMany(() => ClassModel)
  class: ClassModel;

  @HasMany(() => ClassFeedbacksModel)
  classFeedbacks: ClassFeedbacksModel;

  @HasMany(() => ClassReportsModel)
  classReports: ClassReportsModel;
}
