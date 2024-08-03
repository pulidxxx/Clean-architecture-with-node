import { CustomError } from "../../../../shared/domain/services/custom.error";
import { UpdateShirtDto } from "../dtos/update-shirt.dto";
import { ShirtEntity } from "../models/shirt.model";
import { CrudShirtsRepository } from "../repositories/crudShirt.reporitory";

interface UpdateShirtUseCase {
  execute(
    id: number,
    updateShirtDto: UpdateShirtDto
  ): Promise<ShirtEntity>;
}

export class UpdateShirt implements UpdateShirtUseCase {
  constructor(
    private readonly crudShirtsRepository: CrudShirtsRepository
  ) {}

  async execute(
    idCamisa: number,
    updateShirtDto: UpdateShirtDto
  ): Promise<ShirtEntity> {
    // Forward the update request to the repository
    const updatedShirt = await this.crudShirtsRepository.update(
      idCamisa,
      updateShirtDto
    );

    if (!updatedShirt) {
      throw CustomError.notFound("Failed to update shirt");
    }

    return updatedShirt;
  }
}
