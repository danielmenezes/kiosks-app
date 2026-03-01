import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @ApiPropertyOptional({ example: 'Café' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'Expresso forte' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 4.5 })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  status?: number;

  @ApiPropertyOptional({ example: 'http://...' })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}
