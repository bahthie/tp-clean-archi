import { Exception } from "@src/modules/shared/domain/service/util/exception/exceptions.service";
import { OrderStatusEnum } from "../../../model/const/order-status.enum";
import { CreateOrderDtoInterface } from "../../../model/dto/create-order.dto.interface";
import Order from "../../../model/entity/order.orm-entity";
import { OrderRepositoryInterface } from "../../../port/db/order.repository.interface";
import { ExceptionTypeEnum } from "@src/modules/shared/domain/const/exception-type.enum";

export class CreateOrderService {
    constructor(private readonly orderRepository: OrderRepositoryInterface){}

    async createOrder(createOrderDto: CreateOrderDtoInterface): Promise<Order> {
        try {
          const order = await this.orderRepository.persist<Order>(createOrderDto);
          return order;
        } catch (error) {
          throw new Exception(ExceptionTypeEnum.InternalServerError, `Cannot persist order : ${error.message}`);
        }
    }
}

