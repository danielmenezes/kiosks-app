import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesController } from './categories.controller';
import { AddCategoryUseCase } from './use-cases/add-category.use-case';
import { UpdateCategoryUseCase } from './use-cases/update-category.use-case';
import { ListCategoriesUseCase } from './use-cases/list-categories.use-case';
import { InactivateCategoryUseCase } from './use-cases/inactivate-category.use-case';
import { CategoryRepository } from './category.repository';
import { CategoryEntity } from './entities/category.entity';

@Module({
  imports: [SequelizeModule.forFeature([CategoryEntity])],
  controllers: [CategoriesController],
  providers: [
    AddCategoryUseCase,
    UpdateCategoryUseCase,
    ListCategoriesUseCase,
    InactivateCategoryUseCase,
    CategoryRepository,
  ],
})
export class CategoriesModule {}
