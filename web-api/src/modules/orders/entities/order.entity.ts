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
import { StatusOrderEnum } from '../types/status-order.enum';

@Table({ timestamps: true, schema: 'dbo', tableName: 'orders' })
export class OrderEntity extends Model<OrderEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare orderNumber: number;

  @Column({
    type: DataType.ENUM(
      StatusOrderEnum.OPEN,
      StatusOrderEnum.PENDING_PAYMENT,
      StatusOrderEnum.PAID,
      StatusOrderEnum.PREPARING,
      StatusOrderEnum.FINISHED,
      StatusOrderEnum.CANCELLED,
    ),
    defaultValue: StatusOrderEnum.OPEN,
  })
  declare status: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 })
  declare totalAmount: number;

  @HasMany(() => OrderItemEntity)
  declare items: OrderItemEntity[];

  @Column({ field: 'createdAt', type: DataType.DATE, allowNull: false })
  declare createdAt: Date;

  @Column({ field: 'updatedAt', type: DataType.DATE, allowNull: false })
  declare updatedAt: Date;
}
