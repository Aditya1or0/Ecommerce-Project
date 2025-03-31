import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsService } from './products/products.service';
import { PrismaService } from './prisma/prisma.service';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [
    // ConfigModule.forRoot({ isGlobal: true }),
    // ProductsModule,
    // PrismaModule,
  ],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService, PrismaService],
})
export class AppModule {}
