import { CustomError } from "../../../../shared/domain/services/custom.error";
import { ShippingInfoEntity } from "../models/shippingInfo.model";

export class ShippingInfoMapper {
  static shippinginfoEntityFromObject(object: {
    [key: string]: any;
  }): ShippingInfoEntity {
    const {
      id,
      barrio,
      ciudad,
      pais,
      codigoPostal,
      direccion,
      telefono,
      usuarioEmail,
    } = object;

    if (!barrio) throw CustomError.badRequest("Missing barrio");
    if (!ciudad) throw CustomError.badRequest("Missing ciudad");
    if (!pais) throw CustomError.badRequest("Missing pais");
    if (!codigoPostal) throw CustomError.badRequest("Missing codigoPostal");
    if (!direccion) throw CustomError.badRequest("Missing direccion");
    if (!telefono) throw CustomError.badRequest("Missing telefono");
    if (!usuarioEmail)
      throw CustomError.badRequest("Missing Email del usuario");

    return new ShippingInfoEntity(
      id,
      barrio,
      ciudad,
      pais,
      codigoPostal,
      direccion,
      telefono,
      usuarioEmail
    );
  }
}
