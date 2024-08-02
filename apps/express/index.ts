import { Router } from "express";
import { AuthMiddleware } from "../../src/shared/infra/middleware/auth.middleware";
import { CrudUsersApp } from "../../src/admin/crudUsers/app/crudUsers.app";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    // Create the repository and controller
    const controller = new CrudUsersApp().controllerUser();

    router.get("/", [AuthMiddleware.validateJWT], controller.getUsers);
    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);
    router.delete(
      "/:email",
      [AuthMiddleware.validateJWT],
      controller.deleteUser
    );
    router.put(
      "/:oldEmail",
      [AuthMiddleware.validateJWT],
      controller.updateUser
    );

    return router;
  }
}
