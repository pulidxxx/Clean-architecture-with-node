import { CreateShirtDto } from "../dtos/create-shirt.dto";
import { CrudShirtsRepository } from "../repositories/crudShirt.reporitory";

interface CreateShirtUseCase {
  execute(createShirtDto: CreateShirtDto): Promise<any>;
}

export class CreateShirt implements CreateShirtUseCase {
  constructor(private readonly authResository: CrudShirtsRepository) {}

  async execute(createShirtDto: CreateShirtDto): Promise<any> {
    const shirt = await this.authResository.create(createShirtDto);

    return {
      shirt: {
        idCamisa: shirt.idCamisa,
        imagen: shirt.imagen,
        precio: shirt.precio,
        talla: shirt.talla,
        cantidad: shirt.cantidad,
        idEstampado: shirt.idEstampado,
        nombreMaterial: shirt.nombreMaterial,
        numeroPedido: shirt.numeroPedido,
      },
    };
  }
}
