import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdateToCartDto {
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
