import { Injectable, Get, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
    private readonly logger = new Logger(ProductService.name);
    constructor(private prisma: PrismaService) { }

    async findAll(){
        const result = await this.prisma.product.findMany({})
        return result;
    }

  //@Cron('59 * * * * *')
  verifyStock() {
    this.logger.debug('Checking stock of a product');
  }
}
