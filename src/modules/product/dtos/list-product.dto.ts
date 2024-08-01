import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { GeneralQueryDto } from 'src/dtos/general.dto';

export class ProductQueryDto extends GeneralQueryDto {
  @ApiPropertyOptional({
    description: 'Search',
    required: false,
    default: 'Shirt',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
