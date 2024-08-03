export class UpdateShirtDto {
  private constructor(
    public imagen?: string,
    public precio?: string,
    public talla?: string,
    public cantidad?: string,
    public idEstampado?: string,
    public nombreMaterial?: string,
    public numeroPedido?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateShirtDto?] {
    const {
      imagen,
      precio,
      talla,
      cantidad,
      idEstampado,
      nombreMaterial,
      numeroPedido,
    } = object;

    return [
      undefined,
      new UpdateShirtDto(
        imagen,
        precio,
        talla,
        cantidad,
        idEstampado,
        nombreMaterial,
        numeroPedido
      ),
    ];
  }
}
