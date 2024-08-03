export class OrderEntity {
  constructor(
    public numeroPedido: number,
    public valor: number,
    public estado: string,
    public fechaPedido: string,
    public fechaEnvio: string,
    public usuarioEmail: string,
    public informacionEnvioId: string
  ) {}
}
