import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductEntity } from './entities/product.entity';
import { Op } from 'sequelize';

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

  async findAll(
    categoryId?: number,
    activeOnly = true,
  ): Promise<ProductEntity[]> {
    const where: any = {};
    if (activeOnly) {
      where.status = { [Op.ne]: 0 };
    }
    if (categoryId !== undefined) {
      where.categoryId = categoryId;
    }
    return this.productEntity.findAll({ where });
  }

  async getById(id: number): Promise<ProductEntity> {
    return this.productEntity.findByPk(id);
  }
}
