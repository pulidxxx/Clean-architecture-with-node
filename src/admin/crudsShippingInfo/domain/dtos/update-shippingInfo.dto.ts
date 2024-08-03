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
    if (!barrio) return ["Missing barrio"];
    if (!ciudad) return ["Missing ciudad"];
    if (!pais) return ["Missing pais"];
    if (!codigoPostal) return ["Missing codigoPostal"];
    if (!direccion) return ["Missing direccion"];
    if (!telefono) return ["Missing telefono"];
    if (!usuarioEmail) return ["Missing Email del usuario"];
    if (!Validators.email.test(usuarioEmail)) return ["Email is not valid"];

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
