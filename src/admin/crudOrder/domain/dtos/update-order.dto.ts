import { Validators } from "../../../../shared/domain/services";

export class UpdateOrderDto {
  private constructor(
    public valor?: number,
    public estado?: string,
    public fechaPedido?: string,
    public fechaEnvio?: string,
    public usuarioEmail?: string,
    public informacionEnvioId?: number
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateOrderDto?] {
    const {
      valor,
      estado,
      fechaPedido,
      fechaEnvio,
      usuarioEmail,
      informacionEnvioId,
    } = object;

    return [
      undefined,
      new UpdateOrderDto(
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
