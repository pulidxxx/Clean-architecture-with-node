import { CreateShippingInfoDto } from "../dtos/create-shippingInfo.dto";
import { CrudShippingInfosRepository } from "../repositories/crudShippingInfo.reporitory";

interface CreateShippingInfoUseCase {
  execute(createShippingInfoDto: CreateShippingInfoDto): Promise<any>;
}

export class CreateShippingInfo implements CreateShippingInfoUseCase {
  constructor(private readonly authResository: CrudShippingInfosRepository) {}

  async execute(createShippingInfoDto: CreateShippingInfoDto): Promise<any> {
    const shippinginfos = await this.authResository.create(
      createShippingInfoDto
    );

    return {
      shippinginfos: {
        id: shippinginfos.id,
        barrio: shippinginfos.barrio,
        ciudad: shippinginfos.ciudad,
        pais: shippinginfos.pais,
        codigoPostal: shippinginfos.codigoPostal,
        direccion: shippinginfos.direccion,
        telefono: shippinginfos.telefono,
        usuarioEmail: shippinginfos.usuarioEmail,
      },
    };
  }
}
