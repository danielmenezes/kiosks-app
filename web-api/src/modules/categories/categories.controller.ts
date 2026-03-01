import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { AddCategoryUseCase } from './use-cases/add-category.use-case';
import { UpdateCategoryUseCase } from './use-cases/update-category.use-case';
import { ListCategoriesUseCase } from './use-cases/list-categories.use-case';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InactivateCategoryUseCase } from './use-cases/inactivate-category.use-case';
import { CategoryResponseDto } from './dto/category-response.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly addCategory: AddCategoryUseCase,
    private readonly updateCategory: UpdateCategoryUseCase,
    private readonly listCategories: ListCategoriesUseCase,
    private readonly inactivateCategory: InactivateCategoryUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: 201,
    description: 'Category created',
    type: CategoryResponseDto,
  })
  add(@Body() dto: CreateCategoryDto) {
    return this.addCategory.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List active categories' })
  @ApiResponse({
    status: 200,
    description: 'Array of categories',
    type: CategoryResponseDto,
    isArray: true,
  })
  list() {
    return this.listCategories.execute();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update category by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({
    status: 200,
    description: 'Category updated',
    type: CategoryResponseDto,
  })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.updateCategory.execute(Number(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Inactivate category by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Operation result',
    schema: { example: { success: true } },
  })
  inactivate(@Param('id') id: string) {
    return this.inactivateCategory.execute(Number(id));
  }
}
