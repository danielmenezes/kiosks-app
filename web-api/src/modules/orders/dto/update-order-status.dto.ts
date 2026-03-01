import { IsString, IsIn } from 'class-validator';

export class UpdateOrderStatusDto {
  @IsString()
  @IsIn([
    'OPEN',
    'PENDING_PAYMENT',
    'PAID',
    'PREPARING',
    'FINISHED',
    'CANCELLED',
  ])
  status: string;
}
