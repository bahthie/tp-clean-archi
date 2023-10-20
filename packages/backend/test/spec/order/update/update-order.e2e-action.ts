import { NestExpressApplication } from '@nestjs/platform-express';
import Order from '@src/modules/order/domain/model/entity/order.orm-entity';
import request from 'supertest';

export const whenUpdatingAOrderStatus = async (
    app: NestExpressApplication,
    order: Order,
    status: string
): Promise<{
    updateOrderResponse: request.Response;
}> => {
    const updateOrderResponse = await request(app.getHttpServer())
      .patch(`/api/orders/${order.id}/${status}`)  
    return {
      updateOrderResponse,
    };
};