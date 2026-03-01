import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AddProductUseCase } from './use-cases/add-product.use-case';
import { UpdateProductUseCase } from './use-cases/update-product.use-case';
import { RemoveProductUseCase } from './use-cases/remove-product.use-case';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly addProduct: AddProductUseCase,
    private readonly updateProduct: UpdateProductUseCase,
    private readonly removeProduct: RemoveProductUseCase,
  ) {}

  @Post()
  add(@Body() dto: CreateProductDto) {
    return this.addProduct.execute(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.updateProduct.execute(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeProduct.execute(Number(id));
  }
}
