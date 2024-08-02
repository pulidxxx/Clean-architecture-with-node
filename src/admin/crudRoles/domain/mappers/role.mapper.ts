import { CustomError } from "../../../../shared/domain/services/custom.error";
import { RoleEntity } from "../models/role.model";

export class RoleMapper {
  static roleEntityFromObject(object: { [key: string]: any }) {
    const { id, nombre } = object;

    if (!id) throw CustomError.badRequest("Missing id");
    if (!nombre) throw CustomError.badRequest("Missing name");

    return new RoleEntity(id, nombre);
  }
}
