import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import * as ExcelJS from 'exceljs';
import { ProductDto } from 'src/modules/product/dtos/upload-product.dto';
import { Readable } from 'stream';

export const productHeaderMapping = {
  name: 'Name',
  description: 'Description',
  quantity: 'Quantity',
  price: 'Price',
  max_order: 'Maximum Order',
};

export function validateProductHeaders(sheet: ExcelJS.Worksheet): {
  isValid: boolean;
  headers: Record<string, number>;
  issues: string[];
} {
  const row = sheet.getRow(1);
  const headerData = {
    isValid: true,
    headers: {},
    issues: [],
  };

  const headerFields = Object.entries(productHeaderMapping);

  headerFields.forEach(([field, headerValue]) => {
    let headerFound = false;

    row.eachCell((cell, colNumber) => {
      const cellText: string = cell.value
        ? cell.value.toString().trim().toLowerCase()
        : '';
      if (cellText === headerValue.toLowerCase()) {
        headerFound = true;
        headerData.headers[field] = colNumber;
      }
    });

    if (!headerFound) {
      headerData.isValid = false;
      headerData.issues.push(headerValue);
    }
  });

  return headerData;
}

export async function validateProductData(
  products: any[],
): Promise<ProductDto[]> {
  const validatedProducts: ProductDto[] = [];

  for (const product of products) {
    const productDto = plainToInstance(ProductDto, product);

    try {
      await validateOrReject(productDto);
      validatedProducts.push(productDto);
    } catch (errors) {
      const errorMessages = (errors as ValidationError[])
        .map((error: ValidationError) => Object.values(error.constraints))
        .flat();
      throw new BadRequestException(errorMessages);
    }
  }

  return validatedProducts;
}

export async function extractProductsFromCSV(
  file: Express.Multer.File,
): Promise<any[]> {
  const workbook = new ExcelJS.Workbook();
  const stream = Readable.from(file.buffer);
  await workbook.csv.read(stream);
  const worksheet = workbook.getWorksheet(1);

  const headerValidation = validateProductHeaders(worksheet);

  if (!headerValidation.isValid) {
    throw new BadRequestException(
      `Missing required headers: ${headerValidation.issues.join(', ')}`,
    );
  }

  const products = [];
  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber === 1) return;

    const product = {
      name: row.getCell(headerValidation.headers['name']).value.toString(),
      description:
        row
          .getCell(headerValidation.headers['description'])
          .value?.toString() || '',
      quantity: parseInt(
        row.getCell(headerValidation.headers['quantity']).value.toString(),
        10,
      ),
      price: parseFloat(
        row.getCell(headerValidation.headers['price']).value.toString(),
      ),
      max_order: row.getCell(headerValidation.headers['max_order']).value
        ? parseInt(
            row.getCell(headerValidation.headers['max_order']).value.toString(),
            10,
          )
        : undefined,
    };

    products.push(product);
  });

  return products;
}
