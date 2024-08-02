import { CustomError } from "../../../../shared/domain/services/custom.error";
import { UpdateRoleDto } from "../dtos/update-rol.dto";
import { RoleEntity } from "../models/role.model";
import { CrudRolesRepository } from "../repositories/crudRoles.reporitory";

interface UpdateRoleUseCase {
  execute(id: number, updateRoleDto: UpdateRoleDto): Promise<RoleEntity>;
}

export class UpdateRole implements UpdateRoleUseCase {
  constructor(private readonly crudRolesRepository: CrudRolesRepository) {}

  async execute(id: number, updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
    // Forward the update request to the repository
    const updatedRole = await this.crudRolesRepository.update(
      id,
      updateRoleDto
    );

    if (!updatedRole) {
      throw CustomError.notFound("Failed to update role");
    }

    return updatedRole;
  }
}
