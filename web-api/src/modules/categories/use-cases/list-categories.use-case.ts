import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../category.repository';

@Injectable()
export class ListCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute() {
    return this.categoryRepository.findAll(true);
  }
}
