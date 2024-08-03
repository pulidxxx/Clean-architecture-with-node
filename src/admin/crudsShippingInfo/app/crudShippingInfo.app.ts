import { CrudShippingInfos } from "../../../../apps/express/crudShippingInfo";
import { CrudShippingInfosRepository } from "../domain/repositories/crudShippingInfo.reporitory";
import { CrudShippingInfosService } from "../domain/services/crudShippingInfos.service";

export class CrudShippingInfosApp {
  // Create the repository and controller
  controllerShippingInfos = () => {
    const shippinginfosService = new CrudShippingInfosService();
    const shippinginfosRepository = new CrudShippingInfosRepository(
      shippinginfosService
    );
    const shippinginfosController = new CrudShippingInfos(
      shippinginfosRepository
    );
    return shippinginfosController;
  };
}
