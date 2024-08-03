import { CrudShirts } from "../../../../apps/express/crudShirt";
import { CrudShirtsRepository } from "../domain/repositories/crudShirt.reporitory";
import { CrudShirtsService } from "../domain/services/crudShirts.service";

export class CrudShirtsApp {
  // Create the repository and controller
  controllerShirts = () => {
    const shirtService = new CrudShirtsService();
    const shirtRepository = new CrudShirtsRepository(shirtService);
    const shirtController = new CrudShirts(shirtRepository);
    return shirtController;
  };
}
