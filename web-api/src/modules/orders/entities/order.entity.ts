import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import { OrderItemEntity } from './order-item.entity';

@Table({ timestamps: true, schema: 'dbo', tableName: 'orders' })
export class OrderEntity extends Model<OrderEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  orderNumber: number;

  @Column({
    type: DataType.ENUM(
      'OPEN',
      'PENDING_PAYMENT',
      'PAID',
      'PREPARING',
      'FINISHED',
      'CANCELLED',
    ),
    defaultValue: 'OPEN',
  })
  status: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 })
  totalAmount: number;

  @HasMany(() => OrderItemEntity)
  items: OrderItemEntity[];

  @Column({ field: 'createdAt', type: DataType.DATE, allowNull: false })
  declare createdAt: Date;

  @Column({ field: 'updatedAt', type: DataType.DATE, allowNull: false })
  declare updatedAt: Date;
}
