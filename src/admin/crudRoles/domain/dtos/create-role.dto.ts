export class CreateRoleDto {
  private constructor(public id: number, public nombre: string) {}

  static create(object: { [key: string]: any }): [string?, CreateRoleDto?] {
    const { id, nombre } = object;

    if (!id) return ["Missing id"];
    if (!nombre) return ["Missing nombre"];

    return [undefined, new CreateRoleDto(id, nombre)];
  }
}
