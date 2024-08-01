import { Injectable } from '@nestjs/common';
import {
  extractProductsFromCSV,
  validateProductData,
} from 'src/utils/product.upload.utils';
import { PrismaService } from '../prisma/prisma.service';

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
}
