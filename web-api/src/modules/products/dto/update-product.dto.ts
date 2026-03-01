import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  status?: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}
