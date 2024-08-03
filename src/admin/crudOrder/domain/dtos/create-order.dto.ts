import { Validators } from "../../../../shared/domain/services";

export class CreateOrderDto {
  private constructor(
    public valor: number,
    public estado: string,
    public fechaPedido: string,
    public fechaEnvio: string,
    public usuarioEmail: string,
    public informacionEnvioId: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateOrderDto?] {
    const {
      valor,
      estado,
      fechaPedido,
      fechaEnvio,
      usuarioEmail,
      informacionEnvioId,
    } = object;

    if (!valor) return ["Missing value"];
    if (!estado) return ["Missing state"];
    if (!fechaPedido) return ["Missing order date"];
    if (!Validators.date.test(fechaPedido)) return ["Order date is not valid"];
    if (!fechaEnvio) return ["Missing shipping date"];
    if (!Validators.date.test(fechaEnvio))
      return ["Shipping date is not valid"];
    if (!usuarioEmail) return ["Missing user email"];
    if (!informacionEnvioId) return ["Missing shipping informacion"];

    return [
      undefined,
      new CreateOrderDto(
        valor,
        estado,
        fechaPedido,
        fechaEnvio,
        usuarioEmail,
        informacionEnvioId
      ),
    ];
  }
}
