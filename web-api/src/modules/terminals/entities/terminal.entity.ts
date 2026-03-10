import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({ timestamps: true, schema: 'dbo', tableName: 'terminals' })
export class TerminalEntity extends Model<TerminalEntity> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING(), allowNull: false })
  declare password: string;

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  declare name: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  declare status: number;

  @Column({ field: 'created_at', type: DataType.DATE, allowNull: false })
  declare createdAt: Date;

  @Column({ field: 'updated_at', type: DataType.DATE, allowNull: false })
  declare updatedAt: Date;
}
