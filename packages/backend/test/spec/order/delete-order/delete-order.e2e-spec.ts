import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { givenExistingApp } from "@test/utils/fixture/shared/app/app.fixture";
import { givenExistingDbConnection } from "@test/utils/fixture/shared/db-connection/db-connection.fixture";
import DataSource from '@src/modules/database/config/typeorm.config';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';
import { randomUUID } from 'crypto';
import { OrderBuilder } from '../order.e2e-builder';
import { givenExistingOrder } from '../order.e2e-fixture';
import Order from '@src/modules/order/domain/model/entity/order.orm-entity';

describe('Delete order', () => {
    let app: NestExpressApplication;
    let connection: typeof DataSource;

    let orderId = randomUUID();

    beforeAll(async () => {
        app = await givenExistingApp(app);
        connection = await givenExistingDbConnection();
    });

    it('should return Error(404) if the order is not found',async () => {
        const orderResponse = await request(app.getHttpServer()).delete(`/api/orders/${orderId}`);
        expect(orderResponse.status).toBe(404);
    });

    it('should delete the order if the order is not found',async () => {
        const orderBuild = OrderBuilder().build();
        const order = await givenExistingOrder(connection, orderBuild);
        const orderResponse = await request(app.getHttpServer()).delete(`/api/orders/${order.id}`);
        expect(orderResponse.status).toBe(200);
        const orderRepository = connection.getRepository(Order);
 
        const orderInDb = await orderRepository.findOne({ where: { id: order.id } });
        
        expect(orderInDb).toBeNull();
        console.log(orderResponse.body);
        // expect(orderResponse.body.id).toEqual(order.id);
    });

    afterAll(async () => {
        await cleanApp(app, connection);
    });

})