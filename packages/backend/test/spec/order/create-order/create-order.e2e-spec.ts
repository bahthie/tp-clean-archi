import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { givenExistingApp } from "@test/utils/fixture/shared/app/app.fixture";
import { givenExistingDbConnection } from "@test/utils/fixture/shared/db-connection/db-connection.fixture";
import DataSource from '@src/modules/database/config/typeorm.config';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';
import { CreateOrderDtoInterface } from '@src/modules/order/domain/model/dto/create-order.dto.interface';
import { OrderBuilder } from '../order.e2e-builder';

describe('Create Order', () => {
    let app: NestExpressApplication;
    let connection: typeof DataSource;

    beforeAll(async () => {
        app = await givenExistingApp(app);
        connection = await givenExistingDbConnection();
    });

    it('should create an order',async () => {
        const order = OrderBuilder().build();
        const orderResponse = await request(app.getHttpServer()).post('/api/orders').send(order);
        expect(orderResponse.status).toBe(201);
        expect(orderResponse.body.customer).toEqual(order.customer)
    });



    afterAll(async () => {
        await cleanApp(app, connection);
    });
})