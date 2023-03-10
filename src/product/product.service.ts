import { Injectable, Get, Logger, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-producto-dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(private prisma: PrismaService) { }

  async findAll() {
    const results = await this.prisma.product.findMany({
    });
    return results;

  }

  async createProduct(data: Product): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  async findByIdCategory(id: number) {
    return this.prisma.product.findMany({
      where: { categoryId: Number(id) },
    });
  }

  async detailProduct(idProduct: number) {
    return this.prisma.product.findUnique({
      where: { id: idProduct,},
    })
  }

  async deleteProduct(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: { id: Number(id) },
    });
  }
  update(id: number, product: Product) {
    return this.prisma.product.update({
      where: {
        id,
      },
      data: product,
    });
  }

 
  disable(idProd: number) {
    var product =  this.prisma.product.findUnique({
      where: {
        id: idProd,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

     this.prisma.product.update({
      where: { id: idProd },
      data: {
        isActive: true,
      },
    });
    return {
      message: 'This product is now disabled',
    };
  }
  @Cron('59 * * * * *')
  verifyStock() {
    this.logger.debug('Checking stock of a product');
    this.logger.debug('Sending an email to user');
  }
}
