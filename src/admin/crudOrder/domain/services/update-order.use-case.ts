import { CustomError } from "../../../../shared/domain/services/custom.error";
import { UpdateOrderDto } from "../dtos/update-order.dto";
import { OrderEntity } from "../models/order.model";
import { CrudOrdersRepository } from "../repositories/crudOrder.reporitory";

interface UpdateOrderUseCase {
  execute(id: number, updateOrderDto: UpdateOrderDto): Promise<OrderEntity>;
}

export class UpdateOrder implements UpdateOrderUseCase {
  constructor(private readonly crudOrdersRepository: CrudOrdersRepository) {}

  async execute(
    id: number,
    updateOrderDto: UpdateOrderDto
  ): Promise<OrderEntity> {
    // Forward the update request to the repository
    const updatedOrder = await this.crudOrdersRepository.update(
      id,
      updateOrderDto
    );

    if (!updatedOrder) {
      throw CustomError.notFound("Failed to update order");
    }

    return updatedOrder;
  }
}
