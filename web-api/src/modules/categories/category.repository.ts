import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryEntity } from './entities/category.entity';
import { Op } from 'sequelize';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(CategoryEntity)
    private readonly categoryEntity: typeof CategoryEntity,
  ) {}

  async create(data: Partial<CategoryEntity>): Promise<CategoryEntity> {
    return this.categoryEntity.create(data as any);
  }

  async update(
    id: number,
    data: Partial<CategoryEntity>,
  ): Promise<[number] | number> {
    return this.categoryEntity.update(data, { where: { id } });
  }

  async findAll(activeOnly = true): Promise<CategoryEntity[]> {
    const where: any = {};
    if (activeOnly) where.status = { [Op.ne]: 0 };
    return this.categoryEntity.findAll({ where });
  }

  async getById(id: number): Promise<CategoryEntity> {
    return this.categoryEntity.findByPk(id);
  }

  async getByName(name: string): Promise<CategoryEntity> {
    return this.categoryEntity.findOne({ where: { name } });
  }
}
