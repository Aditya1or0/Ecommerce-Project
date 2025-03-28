// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';

// @Injectable()
// export class CartService {
//   constructor(private prisma: PrismaService) {}

//   // Add product to cart or update quantity if product exists
//   async addToCart(userId: number, productId: number, quantity: number) {
//     const existingItem = await this.prisma.cart.findFirst({
//       where: { userId, productId },
//     });

//     if (existingItem) {
//       // If item exists, update quantity
//       return this.prisma.cart.update({
//         where: { id: existingItem.id },
//         data: {
//           quantity: existingItem.quantity + quantity,
//         },
//       });
//     }

//     // If item does not exist, create a new cart item
//     return this.prisma.cart.create({
//       data: {
//         userId,
//         productId,
//         quantity,
//       },
//     });
//   }

//   // Fetch all cart items for a user
//   async getCartItems(userId: number) {
//     return this.prisma.cart.findMany({
//       where: { userId },
//       include: {
//         product: true, // Include product details
//       },
//     });
//   }

//   // Update the quantity of a cart item (increase or decrease)
//   async updateQuantity(cartItemId: number, delta: number) {
//     const cartItem = await this.prisma.cart.findUnique({
//       where: { id: cartItemId },
//     });

//     if (cartItem) {
//       return this.prisma.cart.update({
//         where: { id: cartItemId },
//         data: {
//           quantity: cartItem.quantity + delta,
//         },
//       });
//     }
//   }

//   // Remove an item from the cart
//   async removeFromCart(cartItemId: number) {
//     return this.prisma.cart.delete({
//       where: { id: cartItemId },
//     });
//   }

//   // Clear all items from the cart for a user
//   // async clearCart(userId: number) {
//   //   return this.prisma.cart.deleteMany({
//   //     where: { userId },
//   //   });
//   // }
// }
