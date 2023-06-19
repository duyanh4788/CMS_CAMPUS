import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique, HasMany, BelongsTo } from 'sequelize-typescript';
import { StudentMatchActivitysModel } from './StudentMatchActivitysModel';
import { GroupsModel } from './GroupsModel';

@Table({
  tableName: 'matched_activities'
})
export class MatchActivitiesModel extends Model<MatchActivitiesModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public matchedActivityId: number;

  @ForeignKey(() => GroupsModel)
  @AllowNull
  @Column
  public groupId: number;

  @BelongsTo(() => GroupsModel)
  groups: GroupsModel;

  @AllowNull
  @Column
  public name: string;

  @AllowNull
  @Column
  public time: number;

  @Column
  public unitId: number;

  @AllowNull
  @Column
  public type: string;

  @Column
  public holiday: string;

  @HasMany(() => StudentMatchActivitysModel)
  studentMatchActivity: StudentMatchActivitysModel;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;

  @HasMany(() => StudentMatchActivitysModel)
  public studentMatchActivities: StudentMatchActivitysModel;
}
