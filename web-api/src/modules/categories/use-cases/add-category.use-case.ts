import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../category.repository';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class AddCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(data: CreateCategoryDto) {
    const existing = await this.categoryRepository.getByName(data.name);
    if (existing) {
      throw new HttpException(
        'Category already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.categoryRepository.create(data as any);
  }
}
