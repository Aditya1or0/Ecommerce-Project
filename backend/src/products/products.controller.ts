import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Post('all')
  createAll(@Body() allProducts) {
    return this.productsService.createAll(allProducts);
  }

  @Get('search')
  async search(
    @Query('q') query: string,
    @Query('category') category: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.productsService.search(
      query,
      category,
      parseInt(page),
      parseInt(limit),
    );
  }

  @Get('paginated')
  async getPaginatedProducts(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.productsService.getPaginatedProducts(
      parseInt(page),
      parseInt(limit),
    );
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product | null> {
    return await this.productsService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: CreateProductDto) {
    return this.productsService.update(Number(id), updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(Number(id));
  }
}
