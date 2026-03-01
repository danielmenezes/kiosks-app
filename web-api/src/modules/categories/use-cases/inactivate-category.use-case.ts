import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../category.repository';

@Injectable()
export class InactivateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: number) {
    const result = await this.categoryRepository.update(id, {
      status: 0,
    } as any);
    const affected = Array.isArray(result) ? result[0] : result;
    if (!affected) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return { success: true };
  }
}
