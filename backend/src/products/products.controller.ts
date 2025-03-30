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

  // POST endpoint to create a new product
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // GET endpoint to search for products
  @Get('search')
  async search(
    @Query('q') query: string,
    @Query('category') category: string,
  ): Promise<Product[]> {
    return this.productsService.search(query, category);
  }

  // GET endpoint for paginated products
  @Get('paginated')
  async getPaginatedProducts(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.productsService.getPaginatedProducts(page, limit);
  }

  // GET endpoint to fetch all products
  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  // GET endpoint to fetch a single product by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product | null> {
    return await this.productsService.findOne(Number(id));
  }

  // PUT endpoint to update a product
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: CreateProductDto) {
    return this.productsService.update(Number(id), updateProductDto);
  }

  // DELETE endpoint to remove a product
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(Number(id));
  }
}
