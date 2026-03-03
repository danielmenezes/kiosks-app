import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { OrderEntity } from './entities/order.entity';
import { OrderItemEntity } from './entities/order-item.entity';
import { ProductEntity } from '../products/entities/product.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,

    @InjectModel(OrderEntity)
    private readonly orderEntity: typeof OrderEntity,

    @InjectModel(OrderItemEntity)
    private readonly orderItemEntity: typeof OrderItemEntity,
  ) {}

  async create(orderData: any, transaction: Transaction): Promise<OrderEntity> {
    const order = await this.orderEntity.create(
      {
        orderNumber: orderData.orderNumber,
        status: orderData.status || 'OPEN',
        totalAmount: orderData.totalAmount || 0,
      },
      { transaction },
    );

    const items = orderData.items.map((it) => ({
      orderId: order.id,
      productId: it.productId,
      quantity: it.quantity,
      unitPrice: it.unitPrice ?? 0,
      totalPrice: it.totalPrice ?? 0,
      notes: it.notes,
    }));

    await this.orderItemEntity.bulkCreate(items, { transaction });

    return this.getById(order.id, transaction);
  }

  async getById(id: number, transaction?: Transaction): Promise<OrderEntity> {
    return this.orderEntity.findByPk(id, {
      include: [
        {
          model: OrderItemEntity,
          include: [
            {
              model: ProductEntity,
            },
          ],
        },
      ],
      transaction,
    });
  }

  async findAll(): Promise<OrderEntity[]> {
    return this.orderEntity.findAll({
      include: [
        {
          model: OrderItemEntity,
          include: [
            {
              model: ProductEntity,
            },
          ],
        },
      ],
    });
  }

  async updateStatus(
    id: number,
    status: string,
    transaction?: Transaction,
  ): Promise<number | [number]> {
    return this.orderEntity.update({ status }, { where: { id }, transaction });
  }

  async findLastOrderToday(transaction: Transaction) {
    return this.orderEntity.findOne({
      where: this.sequelize.where(
        this.sequelize.fn('DATE', this.sequelize.col('createdAt')),
        this.sequelize.fn('CURRENT_DATE'),
      ),
      order: [['orderNumber', 'DESC']],
      lock: transaction.LOCK.UPDATE,
      transaction,
    });
  }
}
