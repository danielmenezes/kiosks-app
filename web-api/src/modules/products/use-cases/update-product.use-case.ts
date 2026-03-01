import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductRepository } from '../product.repository';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: number, data: UpdateProductDto) {
    const result = await this.productRepository.update(id, data as any);
    const affected = Array.isArray(result) ? result[0] : result;
    if (!affected) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return { success: true };
  }
}
