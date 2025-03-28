// import { Controller, Post, Body, Get, Patch, Delete } from '@nestjs/common';
// import { CartService } from './cart.service';

// @Controller('cart')
// export class CartController {
//   constructor(private cartService: CartService) {}

//   @Post('add')
//   async addToCart(
//     @Body() body: { userId: number; productId: number; quantity: number },
//   ) {
//     // Add product to cart or update quantity if product exists
//     return this.cartService.addToCart(
//       body.userId,
//       body.productId,
//       body.quantity,
//     );
//   }

//   @Get()
//   async getCartItems(@Body() body: { userId: number }) {
//     // Fetch the cart items for a specific user
//     return this.cartService.getCartItems(body.userId);
//   }

//   @Patch(':cartItemId/increase')
//   async increaseQuantity(@Body() body: { userId: number; cartItemId: number }) {
//     // Increase quantity of an item in the cart
//     return this.cartService.updateQuantity(body.cartItemId, 1);
//   }

//   @Patch(':cartItemId/decrease')
//   async decreaseQuantity(@Body() body: { userId: number; cartItemId: number }) {
//     // Decrease quantity of an item in the cart
//     return this.cartService.updateQuantity(body.cartItemId, -1);
//   }

//   @Delete(':cartItemId')
//   async removeFromCart(@Body() body: { cartItemId: number }) {
//     // Remove item from the cart
//     return this.cartService.removeFromCart(body.cartItemId);
//   }

//   // @Delete('clear')
//   // async clearCart(@Body() body: { userId: number }) {
//   //   // Clear all cart items for a user
//   //   return this.cartService.clearCart(body.userId);
//   // }
// }
