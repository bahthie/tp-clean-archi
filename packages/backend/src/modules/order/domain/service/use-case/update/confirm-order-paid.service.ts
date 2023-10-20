import { Exception } from "@src/modules/shared/domain/service/util/exception/exceptions.service";
import { OrderRepositoryInterface } from "../../../port/db/order.repository.interface";
import { ExceptionTypeEnum } from "@src/modules/shared/domain/const/exception-type.enum";
import Order from "../../../model/entity/order.orm-entity";

export class ConfirmPaidOrderService{
    constructor(private readonly OrderRepository: OrderRepositoryInterface) {}

    async confirmPaidOrder(id: string): Promise<Order> {
        const Order = await this.OrderRepository.findOrderById(id);

        if (!Order) {
            throw new Exception(ExceptionTypeEnum.NotFound, `Order with id ${id} not found`);
        }
        Order.confirmPaid();

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