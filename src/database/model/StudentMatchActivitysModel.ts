import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, BelongsTo } from 'sequelize-typescript';
import { TeachersModel } from './TeachersModel';
import { StudentsModel } from './StudentsModel';
import { MatchActivitiesModel } from './MatchActivitiesModel';
import { ClassModel } from './ClassModel';
import { ProductsModel } from './ProductsModel';
import { GroupsModel } from './GroupsModel';
import { StudentManagementMatchActivityModel } from './StudentManagementMatchActivityModel';

@Table({
  tableName: 'student_match_activitys'
})
export class StudentMatchActivitysModel extends Model<StudentMatchActivitysModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public studentMatchActivityId: number;

  @ForeignKey(() => StudentManagementMatchActivityModel)
  @AllowNull
  @Column
  public studentMnMActivityId: number;
  @BelongsTo(() => StudentManagementMatchActivityModel)
  studentManagementMatchActivity: StudentManagementMatchActivityModel;

  @ForeignKey(() => StudentsModel)
  @AllowNull
  @Column
  public studentId: number;
  @BelongsTo(() => StudentsModel)
  students: StudentsModel;

  @ForeignKey(() => ProductsModel)
  @AllowNull
  @Column
  public productId: number;
  @BelongsTo(() => ProductsModel)
  products: ProductsModel;

  @ForeignKey(() => GroupsModel)
  @Column
  public groupId: number;
  @BelongsTo(() => GroupsModel)
  groups: GroupsModel;

  @ForeignKey(() => MatchActivitiesModel)
  @AllowNull
  @Column
  public matchActivityId: number;
  @BelongsTo(() => MatchActivitiesModel)
  matchActivities: MatchActivitiesModel;

  @ForeignKey(() => ClassModel)
  @Column
  public classId: number;
  @BelongsTo(() => ClassModel)
  class: ClassModel;

  @ForeignKey(() => TeachersModel)
  @Column
  public teacherId: number;
  @BelongsTo(() => TeachersModel)
  teachers: TeachersModel;

  @AllowNull
  @Column
  public numberOfWeeks: number;

  @AllowNull
  @Column({ defaultValue: 'todo' })
  public status: string;

  @AllowNull
  @Column
  public type: string;

  @Column({ defaultValue: false })
  public activate: boolean;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;
}
