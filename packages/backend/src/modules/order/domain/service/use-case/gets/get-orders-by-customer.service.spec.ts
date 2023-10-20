import request from 'supertest';
import { GetOrdersByCustomerService } from './get-orders-by-customer.service';
import { OrderRepositoryInterface } from '../../../port/db/order.repository.interface';

describe('Get orders created by customer', () => {
    const orders = [
        {
            
        }
    ];
    const orderRepositoryMock = {
        getOrdersByCustomer: () => orders
    } as unknown as OrderRepositoryInterface;

    const getOrdersBycustomerService = new GetOrdersByCustomerService(orderRepositoryMock);
    it('should throw an exception when customer name contains numerics', async () => {
        await expect(getOrdersBycustomerService.getOrdersByCustomer('jean-pierre-1')).rejects.toThrow();
    });

    it('should throw an exception when customer name contains less than 5 characters', async () => {
        await expect(getOrdersBycustomerService.getOrdersByCustomer('jan')).rejects.toThrow();
    });

    it('should throw an exception when customer name contains less than 5 characters and less than 5 characters', async () => {
        await expect(getOrdersBycustomerService.getOrdersByCustomer('jan1')).rejects.toThrow();
    });

    it('should return all orders created orders created by a customer', async () => {
        const orderResponse = await getOrdersBycustomerService.getOrdersByCustomer('jean-pierre');
        expect(orderResponse).toEqual(orders);
    });

})

