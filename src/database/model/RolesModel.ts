import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'roles'
})
export class RolesModel extends Model<RolesModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public studentId: number;

  @AllowNull
  @Column
  public name: string;

  @Column
  public parentId: number;

  @Column({ defaultValue: 0 })
  public enrollmentCount: number;

  @AllowNull
  @Column
  public email: string;

  @AllowNull
  @Column
  public gender: string;

  @AllowNull
  @Column
  public dateOfBirth: Date;

  @AllowNull
  @Column
  public country: string;

  @AllowNull
  @Column
  public timeZone: string;

  @Column
  public status: string;

  @AllowNull
  @Column
  public joinedDate: Date;

  @AllowNull
  @Column
  public withDrawal: Date;

  @AllowNull
  @Column
  public introduction: string;

  @Column
  public talkSamId: string;

  @Column({ defaultValue: 0 })
  public basicPoint: number;

  @Column
  public campusId: number;

  @AllowNull
  @Column
  public type: string;

  @Column({ defaultValue: true })
  public activate: number;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;
}
