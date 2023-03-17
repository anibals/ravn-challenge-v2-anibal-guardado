import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Get, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(private prisma: PrismaService,private mailService:MailerService) { }

  async findAll() {
    const results = await this.prisma.product.findMany({
    });
    return results;

  }

  async getPaginationProducts(params: {
    skip?: number;
    take?: number;
}): Promise<Product[]> {
    const { skip, take } = params;

    if (isNaN(skip)) {
        return this.prisma.product.findMany({
            take
        });
    }else{
        return this.prisma.product.findMany({
            skip,
            take
        });
    }
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
  //@Cron('59 * * * * *')
  async verifyStock(config: ConfigService) {
    this.logger.debug('Checking stock of a product');
    const url = `shopplitte.com/auth/confirm?token=`;
    await this.mailService.sendMail({
      to: config.get('MAIL_TO'),
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: "Anibal SIbrian",
        url,
      },
    });
  }
}
