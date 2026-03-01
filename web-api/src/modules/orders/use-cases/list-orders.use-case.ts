import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../order.repository';

@Injectable()
export class ListOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute() {
    return this.orderRepository.findAll();
  }
}
