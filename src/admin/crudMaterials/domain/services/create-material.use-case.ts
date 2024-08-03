import { CreateMaterialDto } from "../dtos/create-material.dto";
import { CrudMaterialsRepository } from "../repositories/crudMaterials.reporitory";

interface CreateMaterialUseCase {
  execute(createMaterialDto: CreateMaterialDto): Promise<any>;
}

export class CreateMaterial implements CreateMaterialUseCase {
  constructor(private readonly authResository: CrudMaterialsRepository) {}

  async execute(createMaterialDto: CreateMaterialDto): Promise<any> {
    const material = await this.authResository.create(createMaterialDto);

    return {
      material: {
        nombre: material.nombre,
        cantidad: material.cantidad,
      },
    };
  }
}
