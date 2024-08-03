export class ShirtEntity {
  constructor(
    public idCamisa: number,
    public imagen: string,
    public precio: string,
    public talla: string,
    public cantidad: string,
    public idEstampado: string,
    public nombreMaterial: string,
    public numeroPedido: string
  ) {}
}
