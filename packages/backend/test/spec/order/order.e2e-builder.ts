import { CreateOrderDtoInterface } from "@src/modules/order/domain/model/dto/create-order.dto.interface";

const orderCreateDefaultData: CreateOrderDtoInterface = {
    customer: "jean-pierre",
    products: ["jambon", "heinken", "whisky"]
}

export const OrderBuilder = (orderCreateData: CreateOrderDtoInterface = orderCreateDefaultData) => {
  return {
    withCustomer: (customer: CreateOrderDtoInterface['customer']) => {
      return OrderBuilder({
        ...orderCreateData,
        customer,
      });
    },

    withProducts: (products: CreateOrderDtoInterface['products']) => {
      return OrderBuilder({
        ...orderCreateData,
        products,
      });
    },

    build() {
      return orderCreateData;
    },
  };
};
