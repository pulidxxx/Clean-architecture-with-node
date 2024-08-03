import { CustomError } from "../../../../shared/domain/services/custom.error";
import { MaterialEntity } from "../models/material.model";

export class MaterialMapper {
  static materialEntityFromObject(object: { [key: string]: any }) {
    const { nombre, cantidad } = object;

    if (!nombre) throw CustomError.badRequest("Missing id");
    if (!cantidad) throw CustomError.badRequest("Missing name");

    return new MaterialEntity(nombre, cantidad);
  }
}
