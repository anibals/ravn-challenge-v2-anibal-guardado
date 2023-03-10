import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private prisma:PrismaService){

    }

    async findAll(){
        return await this.prisma.category.findMany({});
    }

    async createCategory(data: Category): Promise<Category> {
        return this.prisma.category.create({
          data,
        });
      }
}
