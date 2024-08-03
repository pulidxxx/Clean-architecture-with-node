import { CrudMaterials } from "../../../../apps/express/crudMaterials";
import { CrudMaterialsRepository } from "../domain/repositories/crudMaterials.reporitory";
import { CrudMaterialsService } from "../domain/services/crudMaterials.service";

export class CrudMaterialsApp {
  // Create the repository and controller
  controllerMaterials = () => {
    const materialsService = new CrudMaterialsService();
    const materialsRepository = new CrudMaterialsRepository(materialsService);
    const materialsController = new CrudMaterials(materialsRepository);
    return materialsController;
  };
}
