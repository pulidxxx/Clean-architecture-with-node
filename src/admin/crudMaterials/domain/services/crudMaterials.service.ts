import { CustomError } from "../../../../shared/domain/services/custom.error";
import { CrudMaterialsMySQL } from "../../infra/crudMaterials.mysql";

import { CreateMaterialDto } from "../dtos/create-material.dto";
import { UpdateMaterialDto } from "../dtos/update-material.dto";
import { MaterialMapper } from "../mappers/material.mapper";
import { MaterialEntity } from "../models/material.model";

export class CrudMaterialsService {
  constructor() {}

  async register(
    createMaterialDto: CreateMaterialDto
  ): Promise<MaterialEntity> {
    const { nombre, cantidad } = createMaterialDto;

    try {
      // 1. Verify whether material exists or no
      const materialExists = await CrudMaterialsMySQL.findByName(nombre);
      if (materialExists)
        throw CustomError.badRequest("Material already exist");

      const materialId = await CrudMaterialsMySQL.create({
        nombre,
        cantidad,
      });

      // 3. Mapping to MaterialEntity
      const material = await CrudMaterialsMySQL.findByName(nombre);
      return MaterialMapper.materialEntityFromObject(material);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }

  // Method to update a material
  async update(updateMaterialDto: UpdateMaterialDto): Promise<MaterialEntity> {
    const { oldNombre, newNombre, cantidad } = updateMaterialDto;
    try {
      // Check if the material exists
      const materialExists = await CrudMaterialsMySQL.findByName(oldNombre);
      if (!materialExists)
        throw CustomError.notFound("Material to update not found");

      if (newNombre && newNombre != oldNombre) {
        const exists = await CrudMaterialsMySQL.findByName(newNombre);
        if (exists) throw CustomError.badRequest("Material already exists");
      }

      // Prepare update data
      const updateData: Partial<{
        nombre: string;
        cantidad: number;
      }> = {};

      // Add fields to update data
      updateData.nombre = newNombre ? newNombre : oldNombre;
      if (cantidad) updateData.cantidad = cantidad;
      // Update material in the database
      const updated = await CrudMaterialsMySQL.updateByName(
        oldNombre,
        updateData
      );
      if (!updated) throw CustomError.notFound("Failed to update material");

      // Get the updated user
      const updatedUser = await CrudMaterialsMySQL.findByName(
        updateData.nombre || oldNombre
      );
      return MaterialMapper.materialEntityFromObject(updatedUser);
    } catch (error) {
      // Handle errors
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }
}
