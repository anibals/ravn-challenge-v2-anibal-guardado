import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { CategoryService } from './category.service';

@ApiTags('categories')
@Controller('category')
export class CategoryController {

    constructor(private catergoryService: CategoryService) { }

    @Get()
    getCategories() {
        return this.catergoryService.findAll();
    }

    @Post()
    async createTodo(@Body() category: Category): Promise<Category> {
        return this.catergoryService.createCategory(category);
    }

}
