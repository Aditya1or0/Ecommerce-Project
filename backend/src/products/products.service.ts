import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  createAll(allProducts) {
    try {
      const data = allProducts
        .map((product) => ({
          ...product,
          ratingRate: product.rating.rate,
          ratingCount: product.rating.count,
          rating: undefined,
        }))
        .map(({ rating, ...rest }) => rest);

      return this.prisma.product.createMany({
        data: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateProductDto: CreateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  // search method with pagination
  async search(
    query: string,
    category: string,
    page = 1,
    limit = 10,
  ): Promise<{ data: Product[]; total: number }> {
    const skip = (page - 1) * limit;
    const parsedLimit = parseInt(limit.toString(), 10);

    const whereCondition: Prisma.ProductWhereInput = {
      AND: [
        query
          ? {
              OR: [
                {
                  title: {
                    contains: query,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
                {
                  description: {
                    contains: query,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
                {
                  category: {
                    contains: query,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              ],
            }
          : {},
        category
          ? {
              category: {
                equals: category,
                mode: Prisma.QueryMode.insensitive,
              },
            }
          : {},
      ],
    };

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where: whereCondition,
        skip,
        take: parsedLimit,
      }),
      this.prisma.product.count({
        where: whereCondition,
      }),
    ]);

    return { data, total };
  }

  //  paginated products method
  async getPaginatedProducts(
    page = 1,
    limit = 10,
  ): Promise<{ data: Product[]; total: number }> {
    const skip = (page - 1) * limit;
    const parsedLimit = parseInt(limit.toString(), 10);

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take: parsedLimit,
      }),
      this.prisma.product.count(),
    ]);

    return { data, total };
  }
}
