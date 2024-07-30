import { AuthController } from "../../../../apps/express/crudUsers";
import { AuthDatasource } from "../../../domain";
import {
  AuthDatasourceImpl,
  AuthRepositoryImpl,
} from "../../../infrastructure";

export class CrudUsersApp {
  // Create the repository and controller
  controllerUser = () => {
    const datasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);
    const controller = new AuthController(authRepository);
    return controller;
  };
}
