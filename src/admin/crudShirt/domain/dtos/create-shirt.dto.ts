export class CreateShirtDto {
  private constructor(
    public imagen: string,
    public precio: string,
    public talla: string,
    public cantidad: string,
    public idEstampado: string,
    public nombreMaterial: string,
    public numeroPedido: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateShirtDto?] {
    const {
      imagen,
      precio,
      talla,
      cantidad,
      idEstampado,
      nombreMaterial,
      numeroPedido,
    } = object;

    if (!imagen) return ["Missing imagen"];
    if (!precio) return ["Missing precio"];
    if (!talla) return ["Missing talla"];
    if (!cantidad) return ["Missing cantidad"];
    if (!idEstampado) return ["Missing idEstampado"];
    if (!nombreMaterial) return ["Missing nombreMaterial"];
    if (!numeroPedido) return ["Missing Numero del pedido"];

    return [
      undefined,
      new CreateShirtDto(
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
