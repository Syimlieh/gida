import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({
    name: 'product',
    required: true,
    default: 'shirt',
  })
  @IsString()
  @IsNotEmpty({ message: 'Product is required.' })
  product: string;

  @ApiProperty({
    name: 'quantity',
    required: true,
    default: 3,
  })
  @IsPositive()
  @IsNumber()
  @IsNotEmpty({ message: 'Quantity is required.' })
  quantity: number;
}
