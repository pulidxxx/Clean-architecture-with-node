import { CustomError } from "../../../../shared/domain/services/custom.error";
import { ShirtEntity } from "../models/shirt.model";

export class ShirtMapper {
  static shirtEntityFromObject(object: { [key: string]: any }): ShirtEntity {
    const {
      idCamisa,
      imagen,
      precio,
      talla,
      cantidad,
      idEstampado,
      nombreMaterial,
      numeroPedido,
    } = object;

    if (!imagen) throw CustomError.badRequest("Missing imagen");
    if (!precio) throw CustomError.badRequest("Missing precio");
    if (!talla) throw CustomError.badRequest("Missing talla");
    if (!cantidad) throw CustomError.badRequest("Missing cantidad");
    if (!idEstampado) throw CustomError.badRequest("Missing idEstampado");
    if (!nombreMaterial) throw CustomError.badRequest("Missing nombreMaterial");
    if (!numeroPedido) throw CustomError.badRequest("Missing numeroPedido");

    return new ShirtEntity(
      idCamisa,
      imagen,
      precio,
      talla,
      cantidad,
      idEstampado,
      nombreMaterial,
      numeroPedido
    );
  }
}
