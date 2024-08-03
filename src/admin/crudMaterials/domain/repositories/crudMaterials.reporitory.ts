import { CreateMaterialDto } from "../dtos/create-material.dto";
import { UpdateMaterialDto } from "../dtos/update-material.dto";
import { MaterialEntity } from "../models/material.model";
import { CrudMaterialsService } from "../services/crudMaterials.service";

export class CrudMaterialsRepository {
  constructor(private readonly crudMaterialsService: CrudMaterialsService) {}

  create(createMaterialDto: CreateMaterialDto): Promise<MaterialEntity> {
    return this.crudMaterialsService.register(createMaterialDto);
  }

  update(updateMaterialDto: UpdateMaterialDto): Promise<MaterialEntity> {
    return this.crudMaterialsService.update(updateMaterialDto);
  }
}
