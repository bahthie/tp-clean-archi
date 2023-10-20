import { CreateOrderService } from '../../domain/service/use-case/create/create-order.service';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import Order from '../../domain/model/entity/order.orm-entity';
import { GetAllOrdersService } from '../../domain/service/use-case/gets/get-orders.service';
import { GetOrdersCreatedBeforeService } from '../../domain/service/use-case/gets/get-orders-created-before.service';
import { GetOrdersCreatedAFterService } from '../../domain/service/use-case/gets/get-orders-created-after.service';
import { GetOrdersByCustomerService } from '../../domain/service/use-case/gets/get-orders-by-customer.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderPresenter } from '../presenter/order.presenter';
import { ConfirmPaidOrderService } from '../../domain/service/use-case/update/confirm-order-paid.service';
import { CancelOrderService } from '../../domain/service/use-case/update/cancel-order.service';
import { DeleteOrderService } from '../../domain/service/use-case/delete/delete-order.service';

@Controller('/orders')
export default class OrderController {
    constructor(
        private readonly getAllOrderService: GetAllOrdersService,
        private readonly getOrdersCreatedBeforeService: GetOrdersCreatedBeforeService,
        private readonly getOrdersCreatedAFterService: GetOrdersCreatedAFterService,
        private readonly getOrdersByCustomerService: GetOrdersByCustomerService,
        private readonly createOrderService: CreateOrderService,
        private readonly confirmOrderService: ConfirmPaidOrderService,
        private readonly cancelOrderService: CancelOrderService,
        private readonly deleteOrderService: DeleteOrderService
    ) {}


    // - Récupérer toutes les commandes
    @Get()
    async getAllOrders(): Promise<Order[]> {
        return await this.getAllOrderService.getAllOrders();
    }

    // - Récupérer les commandes passées avant une certaine date
    @Get('/created-before/:date')
    async getOrdersCreatedBefore(@Param('date') date: string): Promise<Order[]> {
        return await this.getOrdersCreatedBeforeService.getOrdersCreatedBefore(new Date(date));
    }

    // - Récupérer les commandes passées après une certaine date
    @Get('/created-after/:date')
    async getOrdersCreatedAfter(@Param('date') date: string): Promise<Order[]> {
        return await this.getOrdersCreatedAFterService.getOrdersCreatedAfter(new Date(date));
    }
    // - Récupérer les commandes pour un customer : doit renvoyer une exception si le nom du customer demandé fait moins de 5 caractères ou contient des chiffres.
    @Get('/by-customer/:customer')
    async getOrdersByCustomer(@Param('customer') customer: string){
        return await this.getOrdersByCustomerService.getOrdersByCustomer(customer.trim());
    }


    // - Créer une commande (avec un status par défaut à ‘InCart’)
    @Post()
    async createOrder(@Body() orderDto: CreateOrderDto): Promise<OrderPresenter> {
        const order = await this.createOrderService.createOrder(orderDto);
        return new OrderPresenter(order);
    }
    
    // - Passer une commande à payer
    @Patch('/:id/paid')
    async confirmOrder(@Param('id') id: string): Promise<OrderPresenter> {

        const order = await this.confirmOrderService.confirmPaidOrder(id);

        return new OrderPresenter(order);
    }

    // - Annuler une commande 
    @Patch('/:id/cancel')
    async cancelOrder(@Param('id') id: string): Promise<OrderPresenter> {

        const order = await this.cancelOrderService.cancelOrder(id);

        return new OrderPresenter(order);
    }

    // - Supprimer une commande par son id
    @Delete('/:id')
    async deleteOrder(@Param('id') id: string): Promise<void> {
        return await this.deleteOrderService.deleteOrder(id);
    }
}
