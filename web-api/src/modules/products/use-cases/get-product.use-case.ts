import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductRepository } from '../product.repository';

@Injectable()
export class GetProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: number) {
    const product = await this.productRepository.getById(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }
}
