import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderRepository } from '../order.repository';

@Injectable()
export class GetOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(id: number) {
    const order = await this.orderRepository.getById(id);
    if (!order)
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    return order;
  }
}
