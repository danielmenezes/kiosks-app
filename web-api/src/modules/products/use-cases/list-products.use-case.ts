import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../product.repository';

@Injectable()
export class ListProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(categoryId?: number) {
    return this.productRepository.findAll(categoryId, true);
  }
}
