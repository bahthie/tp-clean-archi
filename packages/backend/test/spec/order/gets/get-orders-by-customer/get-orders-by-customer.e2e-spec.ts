import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { givenExistingApp } from "@test/utils/fixture/shared/app/app.fixture";
import { givenExistingDbConnection } from "@test/utils/fixture/shared/db-connection/db-connection.fixture";
import DataSource from '@src/modules/database/config/typeorm.config';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Get orders created by customer', () => {
    let app: NestExpressApplication;
    let connection: typeof DataSource;

    beforeAll(async () => {
        app = await givenExistingApp(app);
        connection = await givenExistingDbConnection();
    });

    it('should return error(400) if customer name contains numerics', async () => {
        const orderResponse = await request(app.getHttpServer()).get('/api/orders/by-customer/jean-pierre-1');
        expect(orderResponse.status).toBe(400);
    });

    it('should return error(400) if customer name contains less than 5 characters', async () => {
        const orderResponse = await request(app.getHttpServer()).get('/api/orders/by-customer/jan');
        expect(orderResponse.status).toBe(400);
    });

    it('should return error(400) if customer name contains less than 5 characters and less than 5 characters', async () => {
        const orderResponse = await request(app.getHttpServer()).get('/api/orders/by-customer/jan1');
        expect(orderResponse.status).toBe(400);
    });

    it('should return all orders created orders created by a customer', async () => {
        const orderResponse = await request(app.getHttpServer()).get('/api/orders/by-customer/jean-pierre');
        expect(orderResponse.status).toBe(200);
        expect(orderResponse.body).toEqual([]);
    });

    afterAll(async () => {
        await cleanApp(app, connection);
    });

})