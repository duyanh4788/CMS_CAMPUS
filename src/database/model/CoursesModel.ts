import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, AllowNull, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'courses'
})
export class CoursesModel extends Model<CoursesModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public courseId: number;

  @AllowNull
  @Column
  public level: string;

  @AllowNull
  @Column
  public course: string;

  @AllowNull
  @Column
  public unit: number;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;
}
