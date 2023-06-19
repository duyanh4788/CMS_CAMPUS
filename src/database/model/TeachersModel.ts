import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique, HasMany, BelongsTo, HasOne } from 'sequelize-typescript';
import { UsersModel } from './UsersModel';
import { CampusModel } from './CampusModel';
import { ClassModel } from './ClassModel';
import { StudentMatchActivitysModel } from './StudentMatchActivitysModel';
import { StudentManagementMatchActivityModel } from './StudentManagementMatchActivityModel';
import { ClassReportsModel } from './ClassReportsModel';
import { ClassFeedbacksModel } from './ClassFeedbacksModel';

@Table({
  tableName: 'teachers'
})
export class TeachersModel extends Model<TeachersModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public teacherId: number;

  @ForeignKey(() => UsersModel)
  @AllowNull
  @Unique
  @Column
  public userId: number;

  @BelongsTo(() => UsersModel)
  users: UsersModel;

  @ForeignKey(() => CampusModel)
  @Column
  public campusId: number;

  @BelongsTo(() => CampusModel)
  campus: CampusModel;

  @HasOne(() => ClassModel)
  class: ClassModel;

  @AllowNull
  @Column
  public name: string;

  @AllowNull
  @Unique
  @Column
  public email: string;

  @AllowNull
  @Column
  public gender: string;

  @AllowNull
  @Column
  public password: string;

  @AllowNull
  @Column
  public dateOfBirth: Date;

  @Column
  public status: string;

  @AllowNull
  @Column({ defaultValue: true })
  public activate: boolean;

  @AllowNull
  @Column
  public country: string;

  @AllowNull
  @Column
  public timeZone: string;

  @AllowNull
  @Column
  public startDate: Date;

  @AllowNull
  @Column
  public resignation: boolean;

  @AllowNull
  @Column
  public resume: string;

  @AllowNull
  @Column
  public certificate: string;

  @AllowNull
  @Column
  public contract: string;

  @AllowNull
  @Column
  public basicPoint: number;

  @AllowNull
  @Column
  public type: string;

  @AllowNull
  @Column
  public talkSamId: string;

  @AllowNull
  @Column
  public role: string;

  @AllowNull
  @Column
  public memo: string;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;

  @HasMany(() => StudentMatchActivitysModel)
  public studentMatchActivities: StudentMatchActivitysModel;

  @HasMany(() => StudentManagementMatchActivityModel)
  studentManagementMatchactivity: StudentManagementMatchActivityModel[];

  @HasMany(() => ClassFeedbacksModel)
  classFeedbacks: ClassFeedbacksModel;

  @HasMany(() => ClassReportsModel)
  classReports: ClassReportsModel;
}
