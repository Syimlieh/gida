import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartItem } from '@prisma/client';
import { AddToCartDto } from './dtos/add-cart.dto';
import config from 'src/config/config';
import { UpdateToCartDto } from './dtos/update-cart.dto';

@Injectable()
export class CartService {
  private readonly maxQuantity = config.maxQuantity;

  constructor(private readonly prisma: PrismaService) {}

  async addToCart(userId: number, dto: AddToCartDto): Promise<CartItem> {
    const { product, quantity } = dto;

    if (quantity > this.maxQuantity) {
      throw new ForbiddenException(
        `You can only add up to ${this.maxQuantity} items of this product.`,
      );
    }

    const cartItem = await this.prisma.cartItem.upsert({
      where: {
        userId_product: {
          userId,
          product,
        },
      },
      update: {
        quantity: quantity,
      },
      create: {
        product,
        quantity,
        user: {
          connect: { id: userId },
        },
      },
    });

    return cartItem;
  }

  async updateCartItem(
    userId: number,
    product: string,
    dto: UpdateToCartDto,
  ): Promise<CartItem> {
    const { quantity } = dto;

    if (quantity > this.maxQuantity) {
      throw new ForbiddenException(
        `You can only add up to ${this.maxQuantity} items of this product.`,
      );
    }

    const cartItem = await this.prisma.cartItem.update({
      where: {
        userId_product: {
          userId,
          product,
        },
      },
      data: {
        quantity,
      },
    });

    return cartItem;
  }

  async removeFromCart(userId: number, product: string): Promise<void> {
    await this.prisma.cartItem.delete({
      where: {
        userId_product: {
          userId,
          product,
        },
      },
    });
  }
}
