import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { AddProductUseCase } from './use-cases/add-product.use-case';
import { UpdateProductUseCase } from './use-cases/update-product.use-case';
import { InactivateProductUseCase } from './use-cases/inactivate-product.use-case';
import { ListProductsUseCase } from './use-cases/list-products.use-case';
import { GetProductUseCase } from './use-cases/get-product.use-case';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { Auth } from 'src/common/jwt/auth';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly addProduct: AddProductUseCase,
    private readonly updateProduct: UpdateProductUseCase,
    private readonly inactivateProduct: InactivateProductUseCase,
    private readonly listProducts: ListProductsUseCase,
    private readonly getProduct: GetProductUseCase,
  ) {}

  @Post()
  @Auth()
  @ApiOperation({ summary: 'Create new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, type: ProductResponseDto })
  add(@Body() dto: CreateProductDto) {
    return this.addProduct.execute(dto);
  }

  @Get('category/:categoryId')
  @Auth()
  @ApiOperation({ summary: 'List products by category' })
  @ApiParam({ name: 'categoryId', type: Number })
  @ApiResponse({ status: 200, isArray: true, type: ProductResponseDto })
  getByCategory(@Param('categoryId') categoryId: string) {
    return this.listProducts.execute(Number(categoryId));
  }

  @Put(':id')
  @Auth()
  @ApiOperation({ summary: 'Update existing product' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, type: ProductResponseDto })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.updateProduct.execute(Number(id), dto);
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: ProductResponseDto })
  get(@Param('id') id: string) {
    return this.getProduct.execute(Number(id));
  }

  @Delete(':id')
  @Auth()
  @ApiOperation({ summary: 'Inactivate product by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, schema: { example: { success: true } } })
  inactivate(@Param('id') id: string) {
    return this.inactivateProduct.execute(Number(id));
  }
}
