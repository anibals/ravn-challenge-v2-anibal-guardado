import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-producto-dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }

    @Get()
    findAll() {
        return this.productService.findAll();
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
