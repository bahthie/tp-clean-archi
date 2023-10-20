import { ExceptionTypeEnum } from "@src/modules/shared/domain/const/exception-type.enum";
import { Exception } from "@src/modules/shared/domain/service/util/exception/exceptions.service";
import { OrderRepositoryInterface } from "../../port/db/order.repository.interface";

export class DeleteOrderService {
    constructor(private readonly OrderRepository: OrderRepositoryInterface) {}

    async deleteOrder(id: string): Promise<void> {
        const Order = await this.OrderRepository.findOrderById(id);

        if (!Order) {
            throw new Exception(ExceptionTypeEnum.NotFound, `Order with id ${id} not found`);
        }
        await this.OrderRepository.delete({ id: id });
    }
}