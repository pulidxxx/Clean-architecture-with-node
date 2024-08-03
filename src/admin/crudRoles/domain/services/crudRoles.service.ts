import { CustomError } from "../../../../shared/domain/services/custom.error";
import { CrudRolesMySQL } from "../../../crudRoles/infra/crudRoles.mysql";

import { CreateRoleDto } from "../dtos/create-role.dto";
import { UpdateRoleDto } from "../dtos/update-role.dto";
import { RoleMapper } from "../mappers/role.mapper";
import { RoleEntity } from "../models/role.model";

export class CrudRolesService {
  constructor() {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const { id, nombre } = createRoleDto;

    try {
      // 1. Verify whether role exists or no
      const nameExists = await CrudRolesMySQL.findByName(nombre);
      if (nameExists) throw CustomError.badRequest("Role's name already exist");

      const idExists = await CrudRolesMySQL.findByID(id);
      if (idExists) throw CustomError.badRequest("Role's ID already exist");

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
      const exists = await CrudRolesMySQL.findByID(id);
      if (!exists) throw CustomError.badRequest("Role already exists");

      const nameExists = await CrudRolesMySQL.findByName(nombre);
      if (nameExists) throw CustomError.badRequest("Role's name already exist");

      // Prepare update data
      const updateData: Partial<{
        nombre: string;
      }> = {};

      // Add fields to update data
      if (nombre) updateData.nombre = nombre;

      // Update role in the database
      const updated = await CrudRolesMySQL.updateByID(id, updateData);
      if (!updated) throw CustomError.notFound("Failed to update role");

      // Get the updated user
      const updatedRole = await CrudRolesMySQL.findByID(id);
      return RoleMapper.roleEntityFromObject(updatedRole);
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
