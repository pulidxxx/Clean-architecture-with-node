import { CrudUsers } from "../../../../apps/express/crudUsers";
import { CrudUsersRepository } from "../domain/repositories/crudUsers.reporitory";
import { CrudUsersService } from "../domain/services/crudUsers.service";

export class CrudUsersApp {
  // Create the repository and controller
  controllerUser = () => {
    const usersService = new CrudUsersService();
    const usersRepository = new CrudUsersRepository(usersService);
    const userController = new CrudUsers(usersRepository);
    return userController;
  };
}
