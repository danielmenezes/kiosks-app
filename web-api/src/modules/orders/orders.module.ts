import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersController } from './orders.controller';
import { OrderRepository } from './order.repository';
import { OrderEntity } from './entities/order.entity';
import { OrderItemEntity } from './entities/order-item.entity';
import { CreateOrderUseCase } from './use-cases/create-order.use-case';
import { GetOrderUseCase } from './use-cases/get-order.use-case';
import { ListOrdersUseCase } from './use-cases/list-orders.use-case';
import { UpdateOrderStatusUseCase } from './use-cases/update-order-status.use-case';
import { ProductRepository } from '../products/product.repository';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    ProductsModule,
    SequelizeModule.forFeature([OrderEntity, OrderItemEntity]),
  ],
  controllers: [OrdersController],
  providers: [
    OrderRepository,
    CreateOrderUseCase,
    GetOrderUseCase,
    ListOrdersUseCase,
    UpdateOrderStatusUseCase,
    ProductRepository,
  ],
})
export class OrdersModule {}
