import { CrudRoles } from "../../../../apps/express/crudRoles";
import { CrudRolesRepository } from "../domain/repositories/crudRoles.reporitory";
import { CrudRolesService } from "../domain/services/crudRoles.service";

export class CrudRolesApp {
  // Create the repository and controller
  controllerRoles = () => {
    const rolesService = new CrudRolesService();
    const rolesRepository = new CrudRolesRepository(rolesService);
    const rolesController = new CrudRoles(rolesRepository);
    return rolesController;
  };
}
