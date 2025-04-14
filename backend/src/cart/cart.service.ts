import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  //fetch all item present in cart
  async getUserCart(userId: number) {
    return this.prisma.cart.findMany({
      where: { userId },
      include: {
        Product: true,
      },
    });
  }

  //add a item in cart
  async addToCart(userId: number, productId: number, quantity: number) {
    const existing = await this.prisma.cart.findFirst({
      where: { userId, productId },
    });
    //if product is present already then it will add whatever quantity is user selects
    if (existing) {
      return this.prisma.cart.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
    }
    //if product is not present then it will add the product to cart
    return this.prisma.cart.create({
      data: {
        userId,
        productId,
        quantity,
      },
    });
  }

  //shows the total items from cart which i can be used in navbar as well as in cartpage
  async updateQuantity(cartId: number, quantity: number) {
    return this.prisma.cart.update({
      where: { id: cartId },
      data: { quantity },
    });
  }

  //remove a particular item from cart
  async removeFromCart(cartId: number) {
    return this.prisma.cart.delete({
      where: { id: cartId },
    });
  }

  //clear all item from cart
  async clearCart(userId: number) {
    return this.prisma.cart.deleteMany({
      where: { userId },
    });
  }
}
