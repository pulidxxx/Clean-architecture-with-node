import { AuthController } from "../../../../apps/express/crudUsers";
import { AuthRepositoryImpl } from "../domain/repositories/auth.repository.impl";
import { AuthDatasourceImpl } from "../domain/services/auth.datasource.impl";

export class CrudUsersApp {
  // Create the repository and controller
  controllerUser = () => {
    const datasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);
    const controller = new AuthController(authRepository);
    return controller;
  };
}
