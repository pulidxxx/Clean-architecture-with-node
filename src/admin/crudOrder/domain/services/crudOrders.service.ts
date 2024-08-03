import { CustomError } from "../../../../shared/domain/services/custom.error";
import { CrudOrdersMySQL } from "../../infra/crudOrder.mysql";

import { CreateOrderDto } from "../dtos/create-order.dto";
import { UpdateOrderDto } from "../dtos/update-order.dto";
import { OrderMapper } from "../mappers/order.mapper";
import { OrderEntity } from "../models/order.model";

export class CrudOrdersService {
  constructor() {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const {
      valor,
      estado,
      fechaPedido,
      fechaEnvio,
      usuarioEmail,
      informacionEnvioId,
    } = createOrderDto;

    try {
      const orderId = await CrudOrdersMySQL.create({
        valor,
        estado,
        fechaPedido,
        fechaEnvio,
        usuarioEmail,
        informacionEnvioId,
      });

      // 3. Mapping to OrderEntity
      const order = await CrudOrdersMySQL.findLastAdded();
      return OrderMapper.orderEntityFromObject(order);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }

  // Method to update a order
  async update(
    id: number,
    updateOrderDto: UpdateOrderDto
  ): Promise<OrderEntity> {
    const {
      valor,
      estado,
      fechaPedido,
      fechaEnvio,
      usuarioEmail,
      informacionEnvioId,
    } = updateOrderDto;
    try {
      const exists = await CrudOrdersMySQL.findByID(id);
      if (!exists) throw CustomError.notFound("Shippinginfo doesn't exist");

      // Prepare update data
      const updateData: Partial<{
        valor: number;
        estado: string;
        fechaPedido: string;
        fechaEnvio: string;
        usuarioEmail: string;
        informacionEnvioId: number;
      }> = {};

      // Add fields to update data
      if (valor) updateData.valor = valor;
      if (estado) updateData.estado = estado;
      if (fechaPedido) updateData.fechaPedido = fechaPedido;
      if (fechaEnvio) updateData.fechaEnvio = fechaEnvio;
      if (usuarioEmail) updateData.usuarioEmail = usuarioEmail;
      if (informacionEnvioId)
        updateData.informacionEnvioId = informacionEnvioId;

      // Update order in the database
      const updated = await CrudOrdersMySQL.updateByID(id, updateData);
      if (!updated) throw CustomError.notFound("Failed to update order");

      // Get the updated order
      const updatedOrder = await CrudOrdersMySQL.findByID(id);
      return OrderMapper.orderEntityFromObject(updatedOrder);
    } catch (error) {
      // Handle errors
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }
}
