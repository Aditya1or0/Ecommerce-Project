import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Create a new product
  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  // Get all products
  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  // Get a single product by ID
  async findOne(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  //update a particular product by id
  async update(id: number, updateProductDto: CreateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  //delete a single product by id
  async remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  // In ProductsService
  async search(query: string, category?: string): Promise<Product[]> {
    // console.log('Search Query:', query, 'Category:', category);

    return this.prisma.product.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
              { category: { contains: query, mode: 'insensitive' } },
            ],
          },
          category ? { category: category } : {},
        ],
      },
    });
  }

  // Get paginated products
  async getPaginatedProducts(page: number, limit: number): Promise<Product[]> {
    const skip = (page - 1) * limit;

    const parsedLimit = parseInt(limit.toString(), 10);

    return this.prisma.product.findMany({
      skip,
      take: parsedLimit,
    });
  }
}
