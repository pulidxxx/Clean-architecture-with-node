import { CreateOrderDto } from "../dtos/create-order.dto";
import { UpdateOrderDto } from "../dtos/update-order.dto";
import { OrderEntity } from "../models/order.model";
import { CrudOrdersService } from "../services/crudOrders.service";

export class CrudOrdersRepository {
  constructor(private readonly crudOrdersService: CrudOrdersService) {}

  create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    return this.crudOrdersService.create(createOrderDto);
  }

  update(id: number, updateOrderDto: UpdateOrderDto): Promise<OrderEntity> {
    return this.crudOrdersService.update(id, updateOrderDto);
  }
}
