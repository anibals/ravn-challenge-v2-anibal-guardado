import { Body, Controller ,Get, Param} from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
constructor(private orderService:OrderService){}

  @Get('user/:id')
  getUserOrdersById(@Param('id') id: number,) {
    return this.orderService.ordersUser(id);
  }

 
  @Get('/:ido/user/:idu')
  showOrder(@Param("ido") userId: number,@Param("idu") orderId: number) {
    return this.orderService.orderById(userId,orderId);
  }


}
