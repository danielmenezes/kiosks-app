import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  categoryId: number;

  @ApiProperty({ example: 'Café' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Expresso forte' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 4.5 })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  status?: number;

  @ApiPropertyOptional({ example: 'http://...' })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}
