import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'class_boards'
})
export class ClassBoardsModel extends Model<ClassBoardsModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public classBoardId: number;

  @AllowNull
  @Column
  public message: string;

  @AllowNull
  @Column
  public title: string;

  @Column
  public teacherId: number;

  @Column
  public teacherName: string;

  @Column
  public studentId: number;

  @Column
  public studentName: string;

  @AllowNull
  @Column
  public date: Date;

  @AllowNull
  @Column
  public type: string;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;
}
