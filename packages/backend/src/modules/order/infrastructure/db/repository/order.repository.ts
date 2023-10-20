import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import Order from '@src/modules/order/domain/model/entity/order.orm-entity';
import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';

export default class OrderRepository extends Repository<Order> implements OrderRepositoryInterface{
  constructor(
    @InjectDataSource()
    private readonly datasource: DataSource,
  ) {
    super(Order, datasource.createEntityManager());
  }

  async persist<Order>(entityToBePersisted: DeepPartial<Order>): Promise<Order> {
    const orderToBePersisted = this.create(entityToBePersisted);
    const orderPersisted = await this.save(orderToBePersisted);

    return (await this.findOrderById(orderPersisted.id)) as unknown as Order;
  }

  async findOrderById(id: string): Promise<Order> {
    const query = this.createQueryBuilder('order');

    query.where('order.id = :id', { id });

    const order = await query.getOne();

    if (!order) {
      return null;
    }

    return order;
  }
  
  async getOrdersByCustomer(customer: string): Promise<Order[]> {
    const query = this.createQueryBuilder('order');
    query.where('order.customer = :customer', { customer });
    return await query.getMany();
  }
  async getOrdersCreatedAfter(date: Date): Promise<Order[]> {
    const query = this.createQueryBuilder('order');
    query.where('order.createdAt >= :date', { date });
    const orders = await query.getMany();
    return orders;
  }
  async getOrdersCreatedBefore(date: Date): Promise<Order[]> {
    const query = this.createQueryBuilder('order');
    query.where('order.createdAt <= :date', { date });
    const orders = await query.getMany();
    return orders;
  }

  async findAll(): Promise<Order[]> {
    const query = this.createQueryBuilder('order');
    const orders = await query.getMany();
    return orders;
  }
}
