import { Router } from "express";
import { AuthMiddleware } from "../../src/shared/infra/middleware/auth.middleware";
import { CrudUsersApp } from "../../src/admin/crudUsers/app/crudUsers.app";
import { CrudRolesApp } from "../../src/admin/crudRoles/app/crudRoles.app";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    // Create the repository and controller
    const controllerUsers = new CrudUsersApp().controllerUser();
    const controllerRoles = new CrudRolesApp().controllerRoles();

    // User routes
    router.get(
      "/user/",
      [AuthMiddleware.validateJWT],
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

    // Rol routes
    router.get("/role/", controllerRoles.getRoles);
    router.post("/role/create", controllerRoles.createRole);
    router.delete("/role/:id", controllerRoles.deleteRole);
    router.put("/role/:id", controllerRoles.updateRole);

    return router;
  }
}
