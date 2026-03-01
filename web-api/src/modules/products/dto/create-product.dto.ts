import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  categoryId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;

  @IsNumber()
  @IsOptional()
  status?: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}
