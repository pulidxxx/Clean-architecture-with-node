import { Validators } from "../../../../shared/domain/services";

export class UpdateUserDto {
  private constructor(
    public oldEmail: string,
    public nombre?: string,
    public newEmail?: string,
    public password?: string,
    public rolId?: number
  ) {}

  static create(
    oldEmail: string,
    object: { [key: string]: any }
  ): [string?, UpdateUserDto?] {
    const { nombre, email, password, rolId } = object;
    if (!oldEmail) return ["Old email is required"];
    if (email && !Validators.email.test(email))
      return ["New email is not valid"];

    if (password && password.length < 6) return ["Password too short"];
    if (rolId !== undefined && rolId <= 0) return ["Invalid rol ID"];
    return [
      undefined,
      new UpdateUserDto(oldEmail, nombre, email, password, rolId),
    ];
  }
}
