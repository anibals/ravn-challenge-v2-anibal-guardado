import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryController } from './category/category.controller';
import { UserController } from './user/user.controller';
import { ProductController } from './product/product.controller';
import { OrderController } from './order/order.controller';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryService } from './category/category.service';
import { OrderService } from './order/order.service';
import { UserService } from './user/user.service';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ProductModule, PrismaModule, CategoryModule, OrderModule, UserModule, AuthModule, ScheduleModule.forRoot(), MailModule,
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    })],
  controllers: [AppController, CategoryController, UserController, ProductController, OrderController ],
  providers: [AppService, ProductService, CategoryService, OrderService, UserService],
})
export class AppModule {}
