import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Product name is required.' })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsNotEmpty({ message: 'Quantity is requried.' })
  quantity: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Price is requried.' })
  price: number;

  @IsInt()
  @IsOptional()
  max_order: number;
}
