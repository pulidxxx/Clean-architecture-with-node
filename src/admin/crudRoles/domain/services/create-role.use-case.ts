import { CreateRoleDto } from "../dtos/create-role.dto";
import { CrudRolesRepository } from "../repositories/crudRoles.reporitory";

interface CreateRoleUseCase {
  execute(createRoleDto: CreateRoleDto): Promise<any>;
}

export class CreateRole implements CreateRoleUseCase {
  constructor(private readonly authResository: CrudRolesRepository) {}

  async execute(createRoleDto: CreateRoleDto): Promise<any> {
    const role = await this.authResository.create(createRoleDto);

    return {
      role: {
        id: role.id,
        nombre: role.nombre,
      },
    };
  }
}
