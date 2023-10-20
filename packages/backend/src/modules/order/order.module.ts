import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from '@src/modules/order/domain/model/entity/order.orm-entity';
import OrderRepository from '@src/modules/order/infrastructure/db/repository/order.repository';
import OrderController from '@src/modules/order/presentation/controller/order.controller';
import { GetAllOrdersService } from './domain/service/use-case/gets/get-orders.service';
import { OrderRepositoryInterface } from './domain/port/db/order.repository.interface';
import { GetOrdersCreatedBeforeService } from './domain/service/use-case/gets/get-orders-created-before.service';
import { GetOrdersCreatedAFterService } from './domain/service/use-case/gets/get-orders-created-after.service';
import { GetOrdersByCustomerService } from './domain/service/use-case/gets/get-orders-by-customer.service';
import { CreateOrderService } from './domain/service/use-case/create/create-order.service';
import { ConfirmPaidOrderService } from './domain/service/use-case/update/confirm-order-paid.service';
import { CancelOrderService } from './domain/service/use-case/update/cancel-order.service';
import { DeleteOrderService } from './domain/service/use-case/delete/delete-order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    OrderRepository,
    {
      provide: 'OrderRepositoryInterface',
      useClass: OrderRepository,
    },

    {
      provide: GetAllOrdersService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetAllOrdersService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: GetOrdersCreatedBeforeService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrdersCreatedBeforeService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: GetOrdersCreatedAFterService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrdersCreatedAFterService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: GetOrdersByCustomerService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrdersByCustomerService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: CreateOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CreateOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: ConfirmPaidOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new ConfirmPaidOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: CancelOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CancelOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: DeleteOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new DeleteOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
  ],
})
export default class OrderModule {}
