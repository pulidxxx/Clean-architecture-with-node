import { Router } from "express";
import { AuthMiddleware } from "../../src/shared/infra/middleware/auth.middleware";
import { CrudUsersApp } from "../../src/admin/crudUsers/app/crudUsers.app";
import { CrudRolesApp } from "../../src/admin/crudRoles/app/crudRoles.app";
import { CrudMaterialsApp } from "../../src/admin/crudMaterials/app/crudMaterials.app";
import { CrudShippingInfosApp } from "../../src/admin/crudShippingInfo/app/crudShippingInfo.app";
import { CrudOrdersApp } from "../../src/admin/crudOrder/app/crudOrder.app";
import { CrudShirtsApp } from "../../src/admin/crudShirt/app/crudShirt.app";
import { AuthMiddlewareAdmin } from "../../src/shared/infra/middleware/authAdmin.middleware";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    // Create the repository and controller
    const controllerUsers = new CrudUsersApp().controllerUser();
    const controllerRoles = new CrudRolesApp().controllerRoles();
    const controllerMaterials = new CrudMaterialsApp().controllerMaterials();
    const controllerShippingInfos =
      new CrudShippingInfosApp().controllerShippingInfos();
    const controllerOrders = new CrudOrdersApp().controllerOrders();
    const controllerShirts = new CrudShirtsApp().controllerShirts();

    // User routes
    router.get(
      "/user/",
      [AuthMiddlewareAdmin.validateJWT],
      controllerUsers.getUsers
    );
    router.post("/user/login", controllerUsers.loginUser);
    router.post("/user/register", controllerUsers.registerUser);
    router.delete(
      "/user/:email",
      [AuthMiddleware.validateJWT],
      controllerUsers.deleteUser
    );
    router.put(
      "/user/:oldEmail",
      [AuthMiddleware.validateJWT],
      controllerUsers.updateUser
    );

    // Role routes
    router.get("/role/", controllerRoles.getRoles);
    router.post("/role/create", controllerRoles.createRole);
    router.delete("/role/:id", controllerRoles.deleteRole);
    router.put("/role/:id", controllerRoles.updateRole);

    // Material routes
    router.get("/material/", controllerMaterials.getMaterials);
    router.post("/material/create", controllerMaterials.createMaterial);
    router.delete("/material/:nombre", controllerMaterials.deleteMaterial);
    router.put("/material/:nombre", controllerMaterials.updateMaterial);

    // ShippingInfo routes
    router.get("/shippingInfo/", controllerShippingInfos.getShippingInfos);
    router.post(
      "/shippingInfo/create",
      controllerShippingInfos.createShippingInfo
    );
    router.delete(
      "/shippingInfo/:id",
      controllerShippingInfos.deleteShippingInfo
    );
    router.put("/shippingInfo/:id", controllerShippingInfos.updateShippingInfo);

    // Order routes
    router.get("/order/", controllerOrders.getOrders);
    router.post("/order/create", controllerOrders.createOrder);
    router.delete("/order/:numeroPedido", controllerOrders.deleteOrder);
    router.put("/order/:numeroPedido", controllerOrders.updateOrder);

    // Shirt routes
    router.get("/shirt/", controllerShirts.getShirts);
    router.post("/shirt/create", controllerShirts.createShirt);
    router.delete("/shirt/:id", controllerShirts.deleteShirt);
    router.put("/shirt/:id", controllerShirts.updateShirt);

    return router;
  }
}
