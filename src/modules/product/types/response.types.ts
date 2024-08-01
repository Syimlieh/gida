import { Product } from '@prisma/client';

export type PaginatedResponse = { data: Product[]; count: number };
