import { Exception } from "@src/modules/shared/domain/service/util/exception/exceptions.service";
import { OrderRepositoryInterface } from "../../../port/db/order.repository.interface";
import { ExceptionTypeEnum } from "@src/modules/shared/domain/const/exception-type.enum";
import { STRING_LEN_LESS_THAN_5_CHARACTER_OR_INCLUDING_NUMERICS_REGEX } from "../../../model/const/order-regex";

export class GetOrdersByCustomerService {
    constructor(private readonly orderRepository: OrderRepositoryInterface){}
    async getOrdersByCustomer(customer: string){
        if(STRING_LEN_LESS_THAN_5_CHARACTER_OR_INCLUDING_NUMERICS_REGEX.test(customer)){
            throw new Exception(ExceptionTypeEnum.BadRequest, "the customer name must have more than 5 chatacters and don't containt any numerics char.");
        }
        return this.orderRepository.getOrdersByCustomer(customer);
    }
}