import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prsima.module';
// import { CartService } from './cart/cart.service';
// import { CartController } from './cart/cart.controller';
import { ProductsService } from './products/products.service';
import { PrismaService } from './prisma/prisma.service';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [ProductsModule, PrismaModule],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService, PrismaService],
})
export class AppModule {}
