import { Exception } from "@src/modules/shared/domain/service/util/exception/exceptions.service";
import Order from "../../../model/entity/order.orm-entity";
import { ExceptionTypeEnum } from "@src/modules/shared/domain/const/exception-type.enum";
import { OrderRepositoryInterface } from "../../../port/db/order.repository.interface";

export class CancelOrderService {
    constructor(private readonly OrderRepository: OrderRepositoryInterface) {}

    async cancelOrder(id: string): Promise<Order> {
        const Order = await this.OrderRepository.findOrderById(id);

        if (!Order) {
            throw new Exception(ExceptionTypeEnum.NotFound, `Order with id ${id} not found`);
        }
        Order.cancel();

        return await this.saveOrder(Order);
    }

    private async saveOrder(OrderToPersist: DeepPartial<Order>): Promise<Order> {
        try {
            const Order = await this.OrderRepository.persist<Order>(OrderToPersist);

            return Order;
        } catch (error) {
            throw new Exception(ExceptionTypeEnum.InternalServerError, `Cannot persist Order : ${error.message}`);
        }
    }
}