import DataSource from '@src/modules/database/config/typeorm.config';
import { CreateOrderDtoInterface } from '@src/modules/order/domain/model/dto/create-order.dto.interface';
import Order from '@src/modules/order/domain/model/entity/order.orm-entity';

export const givenExistingOrder = async (connection: typeof DataSource, orderBuild: CreateOrderDtoInterface) => {
  const orderRepository = connection.getRepository(Order);

  const order = orderRepository.create(orderBuild as DeepPartial<Order>);

  return orderRepository.save(order);
};
