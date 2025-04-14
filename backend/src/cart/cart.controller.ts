import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get(':userId')
  getCart(@Param('userId') userId: string) {
    return this.cartService.getUserCart(Number(userId));
  }

  @Post('add')
  addToCart(
    @Body() body: { userId: number; productId: number; quantity: number },
  ) {
    const { userId, productId, quantity } = body;
    return this.cartService.addToCart(userId, productId, quantity);
  }

  @Put('update/:cartId')
  updateQuantity(
    @Param('cartId') cartId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.cartService.updateQuantity(Number(cartId), quantity);
  }

  @Delete('remove/:cartId')
  removeItem(@Param('cartId') cartId: string) {
    return this.cartService.removeFromCart(Number(cartId));
  }

  @Delete('clear/:userId')
  clearCart(@Param('userId') userId: string) {
    return this.cartService.clearCart(Number(userId));
  }
}
