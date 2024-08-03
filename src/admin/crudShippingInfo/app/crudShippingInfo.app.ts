import { CrudShippingInfos } from "../../../../apps/express/crudShippingInfo";
import { CrudShippingInfosRepository } from "../domain/repositories/crudShippingInfo.reporitory";
import { CrudShippingInfosService } from "../domain/services/crudShippingInfos.service";

export class CrudShippingInfosApp {
  // Create the repository and controller
  controllerShippingInfos = () => {
    const shippinginfossService = new CrudShippingInfosService();
    const shippinginfossRepository = new CrudShippingInfosRepository(
      shippinginfossService
    );
    const shippinginfossController = new CrudShippingInfos(
      shippinginfossRepository
    );
    return shippinginfossController;
  };
}
