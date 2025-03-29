import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }
  // prisma = new PrismaClient({
  //   log: ['query', 'info', 'warn', 'error'],
  // });
}
