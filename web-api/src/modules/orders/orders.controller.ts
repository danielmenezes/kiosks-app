import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { CreateOrderUseCase } from './use-cases/create-order.use-case';
import { GetOrderUseCase } from './use-cases/get-order.use-case';
import { ListOrdersUseCase } from './use-cases/list-orders.use-case';
import { UpdateOrderStatusUseCase } from './use-cases/update-order-status.use-case';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly createOrder: CreateOrderUseCase,
    private readonly getOrder: GetOrderUseCase,
    private readonly listOrders: ListOrdersUseCase,
    private readonly updateOrderStatus: UpdateOrderStatusUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.createOrder.execute(dto);
  }

  @Get()
  list() {
    return this.listOrders.execute();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.getOrder.execute(Number(id));
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.updateOrderStatus.execute(Number(id), dto.status);
  }
}
