import { CustomError } from "../../../../shared/domain/services/custom.error";
import { CrudRolesMySQL } from "../../../crudRoles/infra/crudRoles.mysql";

import { CreateRoleDto } from "../dtos/create-rol.dto";
import { UpdateRoleDto } from "../dtos/update-rol.dto";
import { RoleMapper } from "../mappers/role.mapper";
import { RoleEntity } from "../models/role.model";

export class CrudRolesService {
  constructor() {}

  async register(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const { id, nombre } = createRoleDto;

    try {
      // 1. Verify whether role exists or no
      const roleExists = await CrudRolesMySQL.findByName(nombre);
      if (roleExists) throw CustomError.badRequest("Role already exist");

      const roleId = await CrudRolesMySQL.create({
        id,
        nombre,
      });

      // 3. Mapping to RoleEntity
      const role = await CrudRolesMySQL.findByID(id);
      return RoleMapper.roleEntityFromObject(role);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }

  // Method to update a role
  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
    const { nombre } = updateRoleDto;
    try {
      // Check if the role exists
      const exists = await CrudRolesMySQL.findByID(id);
      if (!exists) throw CustomError.badRequest("Role already exists");

      // Prepare update data
      const updateData: Partial<{
        nombre: string;
      }> = {};

      // Add fields to update data
      if (nombre) updateData.nombre = nombre;

      // Update role in the database
      const updated = await CrudRolesMySQL.updateByID(id, updateData);
      if (!updated) throw CustomError.notFound("Failed to update user");

      // Get the updated user
      const updatedUser = await CrudRolesMySQL.findByID(id);
      return RoleMapper.roleEntityFromObject(updatedUser);
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
