import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, AllowNull, Unique, ForeignKey, HasMany, DataType, BelongsTo, HasOne } from 'sequelize-typescript';
import { TeachersModel } from './TeachersModel';
import { CampusModel } from './CampusModel';
import { StudentManagementMatchActivityModel } from './StudentManagementMatchActivityModel';
import { ClassReportsModel } from './ClassReportsModel';
import { ClassFeedbacksModel } from './ClassFeedbacksModel';

@Table({
  tableName: 'class'
})
export class ClassModel extends Model<ClassModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public classId: number;

  @ForeignKey(() => CampusModel)
  @Column
  public campusId: number;
  @BelongsTo(() => CampusModel)
  campus: CampusModel;

  @ForeignKey(() => TeachersModel)
  @AllowNull
  @Column
  public teacherId: number;

  @BelongsTo(() => TeachersModel)
  teachers: TeachersModel;

  @AllowNull
  @Column(DataType.TEXT)
  public productIds: string;

  @AllowNull
  @Unique
  @Column
  public name: string;

  @AllowNull
  @Column
  public level: string;

  @AllowNull
  @Column
  public numberOfStudent: number;

  @AllowNull
  @Column
  public availableNumStudent: number;

  @AllowNull
  @Column
  public classStartDate: Date;

  @AllowNull
  @Column
  public classEndDate: Date;

  @AllowNull
  @Column(DataType.TEXT)
  public dateTimeSlot: string;

  @Column
  public durationWeek: number;

  @Column
  public statusUnit: string;

  @AllowNull
  @Column
  public typeOfClass: string;

  @Column
  public initialTextbook: string;

  @AllowNull
  @Column
  public category: string;

  @AllowNull
  @Column({ defaultValue: false })
  public expired: boolean;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;

  @HasMany(() => StudentManagementMatchActivityModel)
  studentManagementMatchActivity: StudentManagementMatchActivityModel[];

  @HasMany(() => ClassReportsModel)
  classReport: ClassReportsModel;

  @HasMany(() => ClassFeedbacksModel)
  classFeedback: ClassFeedbacksModel;
}
