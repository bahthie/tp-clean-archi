import { RepositoryInterface } from "@src/modules/shared/domain/port/db/repository.interface";
import Order from "../../model/entity/order.orm-entity";

export interface OrderRepositoryInterface extends RepositoryInterface {
    findAll(): Promise<Order[]>
    getOrdersCreatedBefore(date: Date): Promise<Order[]>
    getOrdersCreatedAfter(date: Date): Promise<Order[]>
    getOrdersByCustomer(customer: string): Promise<Order[]>
    findOrderById(id: string): Promise<Order>
}