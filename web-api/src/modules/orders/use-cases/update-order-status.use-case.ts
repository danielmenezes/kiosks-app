import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderRepository } from '../order.repository';

@Injectable()
export class UpdateOrderStatusUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(id: number, status: string) {
    const result = await this.orderRepository.updateStatus(id, status);
    const affected = Array.isArray(result) ? result[0] : result;
    if (!affected)
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    return { success: true };
  }
}
