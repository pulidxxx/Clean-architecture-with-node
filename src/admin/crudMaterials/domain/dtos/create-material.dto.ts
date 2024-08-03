export class CreateMaterialDto {
  private constructor(public nombre: string, public cantidad: number) {}

  static create(object: { [key: string]: any }): [string?, CreateMaterialDto?] {
    const { nombre, cantidad } = object;

    if (!nombre) return ["Missing nombre"];
    if (!cantidad) return ["Missing cantidad"];
    if (cantidad < 0) return ["cantidad must be greater than 0"];

    return [undefined, new CreateMaterialDto(nombre, cantidad)];
  }
}
