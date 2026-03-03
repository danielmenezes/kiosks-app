import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { OrderRepository } from '../order.repository';
import { CreateOrderDto } from '../dto/create-order.dto';
import { ProductRepository } from '../../products/product.repository';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly sequelize: Sequelize,
  ) {}

  async execute(data: CreateOrderDto) {
    return this.sequelize.transaction(async (transaction) => {
      const lastOrder =
        await this.orderRepository.findLastOrderToday(transaction);

      const nextNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;

      const itemsWithPrices = await Promise.all(
        data.items.map(async (it) => {
          const product = await this.productRepository.findById(
            it.productId,
            transaction,
          );

          if (!product) {
            throw new Error(`Produto ${it.productId} não encontrado`);
          }

          const unitPrice = Number(product.price);
          const totalPrice = unitPrice * it.quantity;

          return { ...it, unitPrice, totalPrice };
        }),
      );

      const totalAmount = itemsWithPrices.reduce(
        (sum, item) => sum + Number(item.totalPrice),
        0,
      );

      return this.orderRepository.create(
        {
          orderNumber: nextNumber,
          items: itemsWithPrices,
          totalAmount,
        },
        transaction,
      );
    });
  }
}
