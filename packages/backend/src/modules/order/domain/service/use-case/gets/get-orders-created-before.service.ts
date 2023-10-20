import Order from "../../../model/entity/order.orm-entity";
import { OrderRepositoryInterface } from "../../../port/db/order.repository.interface";

export class GetOrdersCreatedBeforeService {
    constructor(private readonly orderRepository: OrderRepositoryInterface){}
    async getOrdersCreatedBefore(date: Date): Promise<Order[]>{
        return this.orderRepository.getOrdersCreatedBefore(date);
    }
}