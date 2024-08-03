import { Validators } from "../../../../shared/domain/services";

export class RegisterUserDto {
  private constructor(
    public nombre: string,
    public email: string,
    public password: string,
    public rolId: number
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { nombre, email, password, rolId } = object;

    if (!nombre) return ["Missing name"];
    if (!email) return ["Missing email"];
    if (!Validators.email.test(email)) return ["Email is not valid"];
    if (!password) return ["Missing password"];
    if (password.length < 6) return ["Password too short"];
    if (!rolId) return ["Missing role"];

    return [undefined, new RegisterUserDto(nombre, email, password, rolId)];
  }
}
