import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { givenExistingApp } from "@test/utils/fixture/shared/app/app.fixture";
import { givenExistingDbConnection } from "@test/utils/fixture/shared/db-connection/db-connection.fixture";
import DataSource from '@src/modules/database/config/typeorm.config';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';
import { OrderBuilder } from '../../order.e2e-builder';
import { givenExistingOrder } from '../../order.e2e-fixture';

describe('Get all orders created after gived date', () => {
    let app: NestExpressApplication;
    let connection: typeof DataSource;

    beforeAll(async () => {
        app = await givenExistingApp(app);
        connection = await givenExistingDbConnection();
    });

    it('should return all orders created after gived date in the db',async () => {
        const orderResponse = await request(app.getHttpServer()).get('/api/orders/created-after/12-09-2023');
        expect(orderResponse.status).toBe(200);
        expect(orderResponse.body).toEqual([]);
    });

    it('should return all orders created after gived date in the db',async () => {
        const orderBuild = OrderBuilder().build();
        const order = await givenExistingOrder(connection, orderBuild);
        const orderResponse = await request(app.getHttpServer()).get('/api/orders/created-after/02-09-2023');
        expect(orderResponse.status).toBe(200);
        expect(orderResponse.body.length).toEqual(1);
        expect(orderResponse.body[0].id).toEqual(order.id);
    });

    afterAll(async () => {
        await cleanApp(app, connection);
    });

})