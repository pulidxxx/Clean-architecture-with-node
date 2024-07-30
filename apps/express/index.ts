import { Router } from "express";
import {
  AuthDatasourceImpl,
  AuthRepositoryImpl,
} from "../../src/infrastructure";
import { AuthMiddleware } from "../../src/presentation/middlewares/auth.middleware";
import { AuthController } from "./crudUsers";
import { CrudUsersApp } from "../../src/admin/crudUsers/app/crudUsers.app";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    // Create the repository and controller
    const controller = new CrudUsersApp().controllerUser();

    router.get("/", [AuthMiddleware.validateJWT], controller.getUsers);
    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);
    router.delete("/:id", [AuthMiddleware.validateJWT], controller.deleteUser);
    router.put("/:id", [AuthMiddleware.validateJWT], controller.updateUser);

    return router;
  }
}
