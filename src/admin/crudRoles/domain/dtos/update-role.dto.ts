export class UpdateRoleDto {
  private constructor(public nombre: string) {}

  static create(object: { [key: string]: any }): [string?, UpdateRoleDto?] {
    const { nombre } = object;
    if (!nombre) return ["Nombre is required"];
    return [undefined, new UpdateRoleDto(nombre)];
  }
}
