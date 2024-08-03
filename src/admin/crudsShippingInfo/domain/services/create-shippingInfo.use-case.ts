import { CreateShippingInfoDto } from "../dtos/create-shippingInfo.dto";
import { CrudShippingInfosRepository } from "../repositories/crudShippingInfo.reporitory";

interface CreateShippingInfoUseCase {
  execute(createShippingInfoDto: CreateShippingInfoDto): Promise<any>;
}

export class CreateShippingInfo implements CreateShippingInfoUseCase {
  constructor(private readonly authResository: CrudShippingInfosRepository) {}

  async execute(createShippingInfoDto: CreateShippingInfoDto): Promise<any> {
    const shippinginfo = await this.authResository.create(
      createShippingInfoDto
    );

    return {
      shippinginfo: {
        id: shippinginfo.id,
        barrio: shippinginfo.barrio,
        ciudad: shippinginfo.ciudad,
        pais: shippinginfo.pais,
        codigoPostal: shippinginfo.codigoPostal,
        direccion: shippinginfo.direccion,
        telefono: shippinginfo.telefono,
        usuarioEmail: shippinginfo.usuarioEmail,
      },
    };
  }
}
