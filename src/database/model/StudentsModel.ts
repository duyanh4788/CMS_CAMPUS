import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique, BelongsTo, HasMany } from 'sequelize-typescript';
import { UsersModel } from './UsersModel';
import { ParentsModel } from './ParentsModel';
import { StudentMatchActivitysModel } from './StudentMatchActivitysModel';
import { CampusModel } from './CampusModel';
import { StudentManagementMatchActivityModel } from './StudentManagementMatchActivityModel';
import { ClassFeedbacksModel } from './ClassFeedbacksModel';
import { ClassReportsModel } from './ClassReportsModel';

@Table({
  tableName: 'students'
})
export class StudentsModel extends Model<StudentsModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public studentId: number;

  @ForeignKey(() => UsersModel)
  @AllowNull
  @Unique
  @Column
  public userId: number;

  @BelongsTo(() => UsersModel)
  users: UsersModel;

  @ForeignKey(() => ParentsModel)
  @Column
  public parentId: number;

  @BelongsTo(() => ParentsModel)
  parent: ParentsModel;

  @ForeignKey(() => CampusModel)
  @Column
  public campusId: number;

  @BelongsTo(() => CampusModel)
  campus: CampusModel;

  @AllowNull
  @Column
  public name: string;

  @AllowNull
  @Column
  public email: string;

  @AllowNull
  @Column
  public password: string;

  @Column
  public gender: string;

  @Column
  public dateOfBirth: Date;

  @Column
  public country: string;

  @Column
  public timeZone: string;

  @Column
  public status: string;

  @Column
  public talkSamId: string;

  @AllowNull
  @Column
  public type: string;

  @Column({ defaultValue: true })
  public activate: boolean;

  @AllowNull
  @Column
  public introduction: string;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;

  @HasMany(() => StudentMatchActivitysModel)
  studentMatchActivity: StudentMatchActivitysModel;

  @HasMany(() => StudentManagementMatchActivityModel)
  studentManagementMatchactivity: StudentManagementMatchActivityModel;

  @HasMany(() => ClassFeedbacksModel)
  classFeedbacks: ClassFeedbacksModel;

  @HasMany(() => ClassReportsModel)
  classReports: ClassReportsModel;
}
