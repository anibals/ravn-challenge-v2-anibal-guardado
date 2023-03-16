import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Shop')
    .setDescription('The Shop API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('products')
    .addTag('orders')
    .addTag('categories')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('DocShop', app, document);
  await app.listen(3000);
}
bootstrap();
