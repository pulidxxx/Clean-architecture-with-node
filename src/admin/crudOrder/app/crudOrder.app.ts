import { CrudOrders } from "../../../../apps/express/crudOrder";
import { CrudOrdersRepository } from "../domain/repositories/crudOrder.reporitory";
import { CrudOrdersService } from "../domain/services/crudOrders.service";

export class CrudOrdersApp {
  // Create the repository and controller
  controllerOrders = () => {
    const ordersService = new CrudOrdersService();
    const ordersRepository = new CrudOrdersRepository(ordersService);
    const ordersController = new CrudOrders(ordersRepository);
    return ordersController;
  };
}
