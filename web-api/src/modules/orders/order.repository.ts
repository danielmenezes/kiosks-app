import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderEntity } from './entities/order.entity';
import { OrderItemEntity } from './entities/order-item.entity';
import { ProductEntity } from '../products/entities/product.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(OrderEntity)
    private readonly orderEntity: typeof OrderEntity,
    @InjectModel(OrderItemEntity)
    private readonly orderItemEntity: typeof OrderItemEntity,
    @InjectModel(ProductEntity)
    private readonly productEntity: typeof ProductEntity,
  ) {}

  async create(orderData: any): Promise<OrderEntity> {
    const sequelize = this.orderEntity.sequelize;
    return await sequelize.transaction(async (t) => {
      const order = await this.orderEntity.create(
        {
          orderNumber: orderData.orderNumber,
          terminalId: orderData.terminalId,
          status: orderData.status || 'OPEN',
          totalAmount: orderData.totalAmount || 0,
        },
        { transaction: t },
      );

      const items = orderData.items.map((it) => ({
        orderId: order.id,
        productId: it.productId,
        quantity: it.quantity,
        unitPrice: it.unitPrice ?? 0,
        totalPrice: it.totalPrice ?? 0,
        notes: it.notes,
      }));

      await this.orderItemEntity.bulkCreate(items, { transaction: t });

      return this.getById(order.id);
    });
  }

  async getById(id: number): Promise<OrderEntity> {
    return this.orderEntity.findByPk(id, {
      include: [{ model: this.orderItemEntity, include: [this.productEntity] }],
    });
  }

  async findByTerminal(terminalId: number): Promise<OrderEntity[]> {
    return this.orderEntity.findAll({
      where: { terminalId },
      include: [this.orderItemEntity],
    });
  }

  async findAll(): Promise<OrderEntity[]> {
    return this.orderEntity.findAll({
      include: [{ model: this.orderItemEntity, include: [this.productEntity] }],
    });
  }

  async updateStatus(id: number, status: string): Promise<number | [number]> {
    return this.orderEntity.update({ status }, { where: { id } });
  }
}
