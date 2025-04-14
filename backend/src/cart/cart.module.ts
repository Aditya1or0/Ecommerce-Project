import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prsima.module';

@Module({
  imports: [PrismaModule],
  controllers: [CartController],
  providers: [CartService, PrismaService],
})
export class CartModule {}
