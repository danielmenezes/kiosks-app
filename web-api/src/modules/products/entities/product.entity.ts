import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { CategoryEntity } from '../../categories/entities/category.entity';

@Table({ timestamps: true, schema: 'dbo', tableName: 'products' })
export class ProductEntity extends Model<ProductEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => CategoryEntity)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare categoryId: number;

  @BelongsTo(() => CategoryEntity)
  declare category: CategoryEntity;

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  declare name: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare description: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  declare price: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  declare status: number;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare imageUrl: string;

  @Column({ field: 'created_at', type: DataType.DATE, allowNull: false })
  declare createdAt: Date;

  @Column({ field: 'updated_at', type: DataType.DATE, allowNull: false })
  declare updatedAt: Date;
}
