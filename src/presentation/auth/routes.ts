import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    // Create the repository and controller
    const datasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);
    const controller = new AuthController(authRepository);

    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);
    router.delete("/:id", [AuthMiddleware.validateJWT], controller.deleteUser);
    router.get("/", [AuthMiddleware.validateJWT], controller.getUsers);
    router.put("/:id", [AuthMiddleware.validateJWT], controller.updateUser);

    return router;
  }
}
