import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, AllowNull, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'class_materials'
})
export class ClassMaterialsModel extends Model<ClassMaterialsModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public classMaterialId: number;

  @AllowNull
  @Column
  public writer: string;

  @AllowNull
  @Column
  public class: string;

  @AllowNull
  @Column
  public title: string;

  @AllowNull
  @Column
  public view: number;

  @AllowNull
  @Column
  public date: Date;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;
}
