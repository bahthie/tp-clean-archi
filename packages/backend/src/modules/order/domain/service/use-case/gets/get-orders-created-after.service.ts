import Order from "../../../model/entity/order.orm-entity";
import { OrderRepositoryInterface } from "../../../port/db/order.repository.interface";

export class GetOrdersCreatedAFterService {
    constructor(private readonly orderRepository: OrderRepositoryInterface){}
    async getOrdersCreatedAfter(date: Date): Promise<Order[]>{
        return this.orderRepository.getOrdersCreatedAfter(date);
    }
}