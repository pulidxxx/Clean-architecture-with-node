import { CreateOrderDto } from "../dtos/create-order.dto";
import { CrudOrdersRepository } from "../repositories/crudOrder.reporitory";

interface CreateOrderUseCase {
  execute(createOrderDto: CreateOrderDto): Promise<any>;
}

export class CreateOrder implements CreateOrderUseCase {
  constructor(private readonly authResository: CrudOrdersRepository) {}

  async execute(createOrderDto: CreateOrderDto): Promise<any> {
    const order = await this.authResository.create(createOrderDto);

    return {
      order: {
        numeroPedido: order.numeroPedido,
        valor: order.valor,
        estado: order.estado,
        fechaPedido: order.fechaPedido,
        fechaEnvio: order.fechaEnvio,
        usuarioEmail: order.usuarioEmail,
        informacionEnvioId: order.informacionEnvioId,
      },
    };
  }
}
