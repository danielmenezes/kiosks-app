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
  declare orderId: number;

  @ForeignKey(() => ProductEntity)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare productId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare quantity: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  declare unitPrice: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  declare totalPrice: number;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare notes: string;

  @BelongsTo(() => OrderEntity)
  declare order: OrderEntity;

  @BelongsTo(() => ProductEntity)
  declare product: ProductEntity;

  @Column({ field: 'createdAt', type: DataType.DATE, allowNull: false })
  declare createdAt: Date;

  @Column({ field: 'updatedAt', type: DataType.DATE, allowNull: false })
  declare updatedAt: Date;
}
