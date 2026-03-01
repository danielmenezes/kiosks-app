import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductRepository } from '../product.repository';

@Injectable()
export class InactivateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: number) {
    const result = await this.productRepository.update(id, {
      status: 0,
    } as any);
    const affected = Array.isArray(result) ? result[0] : result;
    if (!affected) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return { success: true };
  }
}
