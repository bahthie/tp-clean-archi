import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { givenExistingApp } from "@test/utils/fixture/shared/app/app.fixture";
import { givenExistingDbConnection } from "@test/utils/fixture/shared/db-connection/db-connection.fixture";
import DataSource from '@src/modules/database/config/typeorm.config';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';
import { randomUUID } from 'crypto';
import { OrderBuilder } from '../../utils/order.e2e-builder';
import { givenExistingOrder } from '../../utils/order.e2e-fixture';
import Order from '@src/modules/order/domain/model/entity/order.orm-entity';
import { whenUpdatingAOrderStatus } from '../update-order.e2e-action';
import { OrderStatusEnum } from '@src/modules/order/domain/model/const/order-status.enum';

describe('pass order as paid', () => {
    let app: NestExpressApplication;
    let connection: typeof DataSource;
    let order: Order;
    let orderId = randomUUID();

    beforeAll(async () => {
        app = await givenExistingApp(app);
        connection = await givenExistingDbConnection();

        const orderBuild = OrderBuilder().build();
        order = await givenExistingOrder(connection, orderBuild);
    });

    it('should return Error(404) if the order is not found', async () => {
        const orderResponse = await request(app.getHttpServer()).patch(`/api/orders/${orderId}/paid`);
        expect(orderResponse.status).toBe(404);
    });

    it('should change the order status to Paid', async () => {
        const { updateOrderResponse } = await whenUpdatingAOrderStatus(app, order, 'paid');
        expect(updateOrderResponse.status).toBe(200);
        expect(updateOrderResponse.body.id).toEqual(order.id);
        expect(updateOrderResponse.body.status).toEqual(OrderStatusEnum.Paid);
    })

    afterAll(async () => {
        await cleanApp(app, connection);
    });

})