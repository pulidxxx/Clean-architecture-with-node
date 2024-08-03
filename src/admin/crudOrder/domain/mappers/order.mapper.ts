import { CustomError } from "../../../../shared/domain/services/custom.error";
import { OrderEntity } from "../models/order.model";

export class OrderMapper {
  static orderEntityFromObject(object: { [key: string]: any }): OrderEntity {
    const {
      numeroPedido,
      valor,
      estado,
      fechaPedido,
      fechaEnvio,
      usuarioEmail,
      informacionEnvioId,
    } = object;
    if (!numeroPedido) throw CustomError.badRequest("Missing valor");
    if (!valor) throw CustomError.badRequest("Missing valor");
    if (!estado) throw CustomError.badRequest("Missing estado");
    if (!fechaPedido) throw CustomError.badRequest("Missing fechaPedido");
    if (!fechaEnvio) throw CustomError.badRequest("Missing fechaEnvio");
    if (!usuarioEmail) throw CustomError.badRequest("Missing usuarioEmail");
    if (!informacionEnvioId)
      throw CustomError.badRequest("Missing informacionEnvioId");

    return new OrderEntity(
      numeroPedido,
      valor,
      estado,
      fechaPedido,
      fechaEnvio,
      usuarioEmail,
      informacionEnvioId
    );
  }
}
