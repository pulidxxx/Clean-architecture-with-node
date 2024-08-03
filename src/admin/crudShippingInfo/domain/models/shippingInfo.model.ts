export class ShippingInfoEntity {
  constructor(
    public id: number,
    public barrio: string,
    public ciudad: string,
    public pais: string,
    public codigoPostal: string,
    public direccion: string,
    public telefono: string,
    public usuarioEmail: string
  ) {}
}
