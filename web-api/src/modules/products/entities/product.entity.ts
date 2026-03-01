import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({ timestamps: true, schema: 'dbo', tableName: 'products' })
export class ProductEntity extends Model<ProductEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  categoryId: number;

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  description: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  price: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  status: number;

  @Column({ type: DataType.STRING(255), allowNull: true })
  imageUrl: string;

  @Column({ field: 'created_at', type: DataType.DATE, allowNull: false })
  declare createdAt: Date;

  @Column({ field: 'updated_at', type: DataType.DATE, allowNull: false })
  declare updatedAt: Date;
}
