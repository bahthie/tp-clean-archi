import { IsArray, IsString } from 'class-validator';
import { CreateOrderDtoInterface } from '../../domain/model/dto/create-order.dto.interface';

export class CreateOrderDto implements CreateOrderDtoInterface{
  @IsString()
  customer: string;

  @IsArray()
  products: string[];
}
