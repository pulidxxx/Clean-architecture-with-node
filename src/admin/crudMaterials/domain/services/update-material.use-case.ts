import { CustomError } from "../../../../shared/domain/services/custom.error";
import { UpdateMaterialDto } from "../dtos/update-material.dto";
import { MaterialEntity } from "../models/material.model";
import { CrudMaterialsRepository } from "../repositories/crudMaterials.reporitory";

interface UpdateMaterialUseCase {
  execute(updateMaterialDto: UpdateMaterialDto): Promise<MaterialEntity>;
}

export class UpdateMaterial implements UpdateMaterialUseCase {
  constructor(
    private readonly crudMaterialsRepository: CrudMaterialsRepository
  ) {}

  async execute(updateMaterialDto: UpdateMaterialDto): Promise<MaterialEntity> {
    // Forward the update request to the repository
    const updatedMaterial = await this.crudMaterialsRepository.update(
      updateMaterialDto
    );

    if (!updatedMaterial) {
      throw CustomError.notFound("Failed to update material");
    }

    return updatedMaterial;
  }
}
