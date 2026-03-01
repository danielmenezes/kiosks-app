import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../order.repository';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(data: CreateOrderDto) {
    // enrich items with price data from product if not provided
    const itemsWithPrices = await Promise.all(
      data.items.map(async (it) => {
        // repository has product model to fetch price
        const product = await this.orderRepository['productEntity'].findByPk(
          it.productId,
        );
        const unitPrice = product ? Number(product.price) : 0;
        const totalPrice = unitPrice * it.quantity;
        return { ...it, unitPrice, totalPrice };
      }),
    );

    const totalAmount = itemsWithPrices.reduce(
      (s, it) => s + Number(it.totalPrice),
      0,
    );

    return this.orderRepository.create({
      orderNumber: data.orderNumber,
      terminalId: data.terminalId,
      items: itemsWithPrices,
      totalAmount,
    } as any);
  }
}
