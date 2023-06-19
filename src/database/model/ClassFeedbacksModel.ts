import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique, BelongsTo } from 'sequelize-typescript';
import { TeachersModel } from './TeachersModel';
import { ClassModel } from './ClassModel';
import { StudentsModel } from './StudentsModel';
import { CampusModel } from './CampusModel';

@Table({
  tableName: 'class_feedbacks'
})
export class ClassFeedbacksModel extends Model<ClassFeedbacksModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public classFeedbackId: number;

  @ForeignKey(() => TeachersModel)
  @AllowNull
  @Column
  public teacherId: number;
  @BelongsTo(() => TeachersModel)
  teachers: TeachersModel;

  @ForeignKey(() => ClassModel)
  @AllowNull
  @Column
  public classId: number;
  @BelongsTo(() => ClassModel)
  class: ClassModel;

  @ForeignKey(() => StudentsModel)
  @AllowNull
  @Column
  public studentId: number;
  @BelongsTo(() => StudentsModel)
  students: StudentsModel;

  @ForeignKey(() => CampusModel)
  @Column
  public campusId: number;
  @BelongsTo(() => CampusModel)
  campus: CampusModel;

  @AllowNull
  @Column
  public date: Date;

  @AllowNull
  @Column
  public satisfaction: number;

  @AllowNull
  @Column
  public comment: string;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;
}
