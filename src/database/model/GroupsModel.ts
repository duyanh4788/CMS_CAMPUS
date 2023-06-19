import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique, HasMany, BelongsTo, HasOne } from 'sequelize-typescript';
import { StudentMatchActivitysModel } from './StudentMatchActivitysModel';
import { MatchActivitiesModel } from './MatchActivitiesModel';

@Table({
  tableName: 'groups'
})
export class GroupsModel extends Model<GroupsModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public groupId: number;

  @AllowNull
  @Column
  public name: string;

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

  @HasMany(() => MatchActivitiesModel)
  public matchActivities: MatchActivitiesModel[];
}
