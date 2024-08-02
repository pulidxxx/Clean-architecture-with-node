import { CreateRoleDto } from "../dtos/create-rol.dto";
import { UpdateRoleDto } from "../dtos/update-rol.dto";
import { RoleEntity } from "../models/role.model";
import { CrudRolesService } from "../services/crudRoles.service";

export class CrudRolesRepository {
  constructor(private readonly crudRolesService: CrudRolesService) {}

  create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    return this.crudRolesService.register(createRoleDto);
  }

  update(id: number, updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
    return this.crudRolesService.update(id, updateRoleDto);
  }
}
