import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { AddCategoryUseCase } from './use-cases/add-category.use-case';
import { UpdateCategoryUseCase } from './use-cases/update-category.use-case';
import { ListCategoriesUseCase } from './use-cases/list-categories.use-case';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InactivateCategoryUseCase } from './use-cases/inactivate-category.use-case';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly addCategory: AddCategoryUseCase,
    private readonly updateCategory: UpdateCategoryUseCase,
    private readonly listCategories: ListCategoriesUseCase,
    private readonly inactivateCategory: InactivateCategoryUseCase,
  ) {}

  @Post()
  add(@Body() dto: CreateCategoryDto) {
    return this.addCategory.execute(dto);
  }

  @Get()
  list() {
    return this.listCategories.execute();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.updateCategory.execute(Number(id), dto);
  }

  @Delete(':id')
  inactivate(@Param('id') id: string) {
    return this.inactivateCategory.execute(Number(id));
  }
}
