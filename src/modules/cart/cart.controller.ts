import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto } from './dtos/add-cart.dto';
import { GetCurrentUser } from 'src/decorators';
import { UpdateToCartDto } from './dtos/update-cart.dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add items to cart' })
  async addToCart(
    @Body() addToCartDto: AddToCartDto,
    @GetCurrentUser('id') userId: number,
  ) {
    return this.cartService.addToCart(userId, addToCartDto);
  }

  @Patch('/:product')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update items quantity to cart' })
  async updateToCart(
    @Body() addToCartDto: UpdateToCartDto,
    @Param('product') product: string,
    @GetCurrentUser('id') userId: number,
  ) {
    return this.cartService.updateCartItem(userId, product, addToCartDto);
  }

  @Delete('/:product')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete items from cart' })
  async removeFromCart(
    @Param('product') product: string,
    @GetCurrentUser('id') userId: number,
  ) {
    return this.cartService.removeFromCart(userId, product);
  }
}
