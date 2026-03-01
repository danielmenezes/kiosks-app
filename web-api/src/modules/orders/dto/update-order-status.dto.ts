import { IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderStatusDto {
  @ApiProperty({ example: 'PAID' })
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
