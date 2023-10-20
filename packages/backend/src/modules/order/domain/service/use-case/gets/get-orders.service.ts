import Order from "../../../model/entity/order.orm-entity";
import { OrderRepositoryInterface } from "../../../port/db/order.repository.interface";

export class GetAllOrdersService {
    constructor(private readonly orderRepository: OrderRepositoryInterface){}
    async getAllOrders(): Promise<Order[]>{
        return this.orderRepository.findAll();
    }
}