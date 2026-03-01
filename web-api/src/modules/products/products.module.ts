import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsController } from './products.controller';
import { AddProductUseCase } from './use-cases/add-product.use-case';
import { UpdateProductUseCase } from './use-cases/update-product.use-case';
import { RemoveProductUseCase } from './use-cases/remove-product.use-case';
import { ProductRepository } from './product.repository';
import { ProductEntity } from './entities/product.entity';

@Module({
  imports: [SequelizeModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
  providers: [
    AddProductUseCase,
    UpdateProductUseCase,
    RemoveProductUseCase,
    ProductRepository,
  ],
})
export class ProductsModule {}
