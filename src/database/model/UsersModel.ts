import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique, HasMany } from 'sequelize-typescript';
import { TeachersModel } from './TeachersModel';
import { StudentsModel } from './StudentsModel';

@Table({
  tableName: 'users'
})
export class UsersModel extends Model<UsersModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public userId: number;

  @AllowNull
  @Column
  public name: string;

  @AllowNull
  @Unique
  @Column
  public userName: string;

  @AllowNull
  @Unique
  @Column
  public email: string;

  @AllowNull
  @Column
  public password: string;

  @AllowNull
  @Column
  public roleId: string;

  @Column
  public phone: number;

  @Column
  public teacherId: number;
  @HasMany(() => TeachersModel)
  teachers: TeachersModel;

  @Column
  public studentId: number;
  @HasMany(() => StudentsModel)
  students: StudentsModel;

  @Column
  public parentId: number;

  @Column
  public campusManagerId: number;

  @Column
  public campusId: number;

  @Column({ defaultValue: true })
  public activate: boolean;

  @Column({ defaultValue: true })
  @Column
  public checkLogin: boolean;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;
}
