import {
  Controller,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/decorators';
import { ProductQueryDto } from './dtos/list-product.dto';
import { PaginatedResponse } from './types/response.types';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/bulk')
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiOperation({ summary: 'Add Product in bulk' })
  async addToCart(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'text/csv' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.productService.uploadProduct(file);
  }

  @Public
  @Get('/')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Product List' })
  async listProducts(
    @Query() productQueryDto: ProductQueryDto,
  ): Promise<PaginatedResponse> {
    console.log('controller');
    const { search, page, limit } = productQueryDto;
    return this.productService.listProducts(
      search,
      Number(page),
      Number(limit),
    );
  }
}
