import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {
    constructor(
        private prisma: PrismaService,
      ) {}
    
      async ordersUser(userId: number) {
        return this.prisma.order.findMany({
          where: {
            userId: userId,
          },
          include: {
            product: true,
          },
        });
      }
    
     async orderById(userId: number, orderId: number) {
        return this.prisma.order.findFirst({
          where: {
            userId: userId,
            id: orderId,
          },
        });
      }
    
   
}
