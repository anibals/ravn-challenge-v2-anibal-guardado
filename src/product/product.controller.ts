import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-producto-dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService:ProductService){}
    
    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Post('upload')
@UseInterceptors(FileInterceptor('file'))
uploadFile(@UploadedFile() file: Express.Multer.File) {
  console.log(file.mimetype);
}
    @Post()
    createProduct(@Body() product:CreateProductDto): string{
        console.log(product);
        return "created";
    }

    @Put(":id")
    updateProducto(@Param("id") id):{}{
        console.log("Product Updated ",id)
        return {"description":"updated product"}
    }

    @Put(":id")
    disableProducto(@Param("id") id):{}{
        console.log("Deshabilanto ",id)
        return {"description":"disabled product"}
    }
    @Delete(":id")
    deleteProducto(@Param("id") id):{}{
        console.log("Deleted ",id)
        return {"description":"Deleted product"}
    }
}
