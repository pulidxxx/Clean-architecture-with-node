import { Validators } from "../../../../shared/domain/services";

export class UpdateShippingInfoDto {
  private constructor(
    public barrio?: string,
    public ciudad?: string,
    public pais?: string,
    public codigoPostal?: string,
    public direccion?: string,
    public telefono?: string,
    public usuarioEmail?: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, UpdateShippingInfoDto?] {
    const {
      barrio,
      ciudad,
      pais,
      codigoPostal,
      direccion,
      telefono,
      usuarioEmail,
    } = object;

    return [
      undefined,
      new UpdateShippingInfoDto(
        barrio,
        ciudad,
        pais,
        codigoPostal,
        direccion,
        telefono,
        usuarioEmail
      ),
    ];
  }
}
