import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class GeneralQueryDto {
  @ApiPropertyOptional({
    description: 'Number of items to return per page',
    type: Number,
    default: 20,
  })
  @IsOptional()
  @IsNumberString()
  limit?: number;

  @ApiPropertyOptional({
    description: 'Page number to retrieve',
    type: Number,
    default: 1,
  })
  @IsOptional()
  @IsNumberString()
  page?: number;
}
