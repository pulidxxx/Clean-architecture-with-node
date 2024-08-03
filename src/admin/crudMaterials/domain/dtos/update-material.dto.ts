export class UpdateMaterialDto {
  private constructor(
    public oldNombre: string,
    public newNombre?: string,
    public cantidad?: number
  ) {}

  static create(
    oldNombre: string,
    object: { [key: string]: any }
  ): [string?, UpdateMaterialDto?] {
    const { nombre, cantidad } = object;
    if (!oldNombre) return ["Missing old name "];
    if (cantidad && cantidad < 0) return ["Cantidad must be greater than 0"];

    return [undefined, new UpdateMaterialDto(oldNombre, nombre, cantidad)];
  }
}
