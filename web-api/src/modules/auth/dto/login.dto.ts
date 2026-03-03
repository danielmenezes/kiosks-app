import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'customer' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'customer123' })
  password: string;
}
