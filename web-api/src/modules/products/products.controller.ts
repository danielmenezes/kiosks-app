import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { AddProductUseCase } from './use-cases/add-product.use-case';
import { UpdateProductUseCase } from './use-cases/update-product.use-case';
import { RemoveProductUseCase } from './use-cases/remove-product.use-case';
import { GetAllProductsUseCase } from './use-cases/get-all-products.use-case';
import { GetProductUseCase } from './use-cases/get-product.use-case';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly addProduct: AddProductUseCase,
    private readonly updateProduct: UpdateProductUseCase,
    private readonly removeProduct: RemoveProductUseCase,
    private readonly getAllProducts: GetAllProductsUseCase,
    private readonly getProduct: GetProductUseCase,
  ) {}

  @Post()
  add(@Body() dto: CreateProductDto) {
    return this.addProduct.execute(dto);
  }

  @Get('category/:categoryId')
  getByCategory(@Param('categoryId') categoryId: string) {
    return this.getAllProducts.execute(Number(categoryId));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.updateProduct.execute(Number(id), dto);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.getProduct.execute(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeProduct.execute(Number(id));
  }
}
