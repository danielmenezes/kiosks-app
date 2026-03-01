import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../product.repository';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class AddProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: CreateProductDto) {
    return this.productRepository.create(data as any);
  }
}
