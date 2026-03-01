import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsController } from './products.controller';
import { AddProductUseCase } from './use-cases/add-product.use-case';
import { UpdateProductUseCase } from './use-cases/update-product.use-case';
import { RemoveProductUseCase } from './use-cases/remove-product.use-case';
import { GetAllProductsUseCase } from './use-cases/get-all-products.use-case';
import { GetProductUseCase } from './use-cases/get-product.use-case';
import { ProductRepository } from './product.repository';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from '../categories/entities/category.entity';

@Module({
  imports: [SequelizeModule.forFeature([ProductEntity, CategoryEntity])],
  controllers: [ProductsController],
  providers: [
    AddProductUseCase,
    UpdateProductUseCase,
    RemoveProductUseCase,
    GetAllProductsUseCase,
    GetProductUseCase,
    ProductRepository,
  ],
})
export class ProductsModule {}
