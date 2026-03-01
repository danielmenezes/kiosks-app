import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../category.repository';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: number, data: UpdateCategoryDto) {
    const result = await this.categoryRepository.update(id, data as any);
    const affected = Array.isArray(result) ? result[0] : result;
    if (!affected) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return { success: true };
  }
}
