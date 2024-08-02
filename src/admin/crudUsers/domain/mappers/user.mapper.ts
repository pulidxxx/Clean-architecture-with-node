import { UserEntity } from "../models/user.model";
import { CustomError } from "../../../../shared/domain/services/custom.error";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { nombre, email, password, rolId } = object;

    if (!nombre) throw CustomError.badRequest("Missing name");
    if (!email) throw CustomError.badRequest("Missing email");
    if (!password) throw CustomError.badRequest("Missing password");
    if (!rolId) throw CustomError.badRequest("Missing rol");

    return new UserEntity(nombre, email, password, rolId);
  }
}
