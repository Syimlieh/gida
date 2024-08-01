import { Injectable } from '@nestjs/common';
import {
  extractProductsFromCSV,
  validateProductData,
} from 'src/utils/product.upload.utils';
import { PrismaService } from '../prisma/prisma.service';
import { PaginatedResponse } from './types/response.types';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadProduct(file: Express.Multer.File): Promise<any> {
    const products = await extractProductsFromCSV(file);
    const validatedProducts = await validateProductData(products);

    for (const product of validatedProducts) {
      await this.prisma.product.upsert({
        where: { name: product.name },
        update: product,
        create: product,
      });
    }

    return { message: 'Products uploaded and validated successfully' };
  }

  async listProducts(
    search?: string,
    page: number = 1,
    limit: number = 20,
  ): Promise<PaginatedResponse> {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (search !== undefined) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    const count = await this.prisma.product.count({ where });
    const data = await this.prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { data, count };
  }
}
