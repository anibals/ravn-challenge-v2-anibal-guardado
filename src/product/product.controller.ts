import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-producto-dto';
import { ProductService } from './product.service';

@ApiTags('products')
@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }

    @Get()
    findAll() {
        return this.productService.findAll();
    }
    @Get("offset")
    getProductsPagination(@Query('skip') skip: string, @Query('take') take: string): Promise<Product[]>{
        return this.productService.getPaginationProducts({skip: Number(skip), take: Number(take)});
    }

    //get products by category Id
    @Get("category/:idCategory")
    findByCategory(@Param("idCategory") id) {
        return this.productService.findByIdCategory(id);
    }

    //get one product details
    @Get("/:id/detail")
    detailProduct(@Param("id") id) {
        return this.productService.detailProduct(id);
    }

    @Post()
    async createProduct(@Body() product: Product): Promise<Product> {
        return this.productService.createProduct(product);
    }



    @Put(':id')
    updateProduct(@Param('id') id: string, @Body() Product: Product) {
      return this.productService.update(+id, Product);
    }

    @Put(':id')
    disabelProduct(@Param('id') id: string) {
      return this.productService.disable(+id);
    }
    @Delete(":id")
    deleteProducto(@Param("id") id): {} {
        return this.productService.deleteProduct(id);
    }
}
