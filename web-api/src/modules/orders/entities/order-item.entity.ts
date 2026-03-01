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
import { OrderEntity } from './order.entity';
import { ProductEntity } from '../../products/entities/product.entity';

@Table({ timestamps: true, schema: 'dbo', tableName: 'order_items' })
export class OrderItemEntity extends Model<OrderItemEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => OrderEntity)
  @Column({ type: DataType.INTEGER, allowNull: false })
  orderId: number;

  @ForeignKey(() => ProductEntity)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  unitPrice: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  totalPrice: number;

  @Column({ type: DataType.TEXT, allowNull: true })
  notes: string;

  @BelongsTo(() => OrderEntity)
  order: OrderEntity;

  @BelongsTo(() => ProductEntity)
  product: ProductEntity;

  @Column({ field: 'createdAt', type: DataType.DATE, allowNull: false })
  declare createdAt: Date;

  @Column({ field: 'updatedAt', type: DataType.DATE, allowNull: false })
  declare updatedAt: Date;
}
