import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersController } from './orders.controller';
import { OrderRepository } from './order.repository';
import { OrderEntity } from './entities/order.entity';
import { OrderItemEntity } from './entities/order-item.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { CreateOrderUseCase } from './use-cases/create-order.use-case';
import { GetOrderUseCase } from './use-cases/get-order.use-case';
import { ListOrdersUseCase } from './use-cases/list-orders.use-case';
import { UpdateOrderStatusUseCase } from './use-cases/update-order-status.use-case';

@Module({
  imports: [
    SequelizeModule.forFeature([OrderEntity, OrderItemEntity, ProductEntity]),
  ],
  controllers: [OrdersController],
  providers: [
    OrderRepository,
    CreateOrderUseCase,
    GetOrderUseCase,
    ListOrdersUseCase,
    UpdateOrderStatusUseCase,
  ],
})
export class OrdersModule {}
