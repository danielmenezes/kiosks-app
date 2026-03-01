import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(ProductEntity)
    private readonly productEntity: typeof ProductEntity,
  ) {}

  async create(data: Partial<ProductEntity>): Promise<ProductEntity> {
    return this.productEntity.create(data as any);
  }

  async update(
    id: number,
    data: Partial<ProductEntity>,
  ): Promise<[number] | number> {
    return this.productEntity.update(data, { where: { id } });
  }

  async getById(id: number): Promise<ProductEntity> {
    return this.productEntity.findByPk(id);
  }
}
