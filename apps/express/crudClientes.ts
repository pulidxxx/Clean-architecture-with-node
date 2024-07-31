import { Request, Response } from "express";
import { UserModel } from "../../src/admin/crudUsers/infra/crudUsers.mysql";

import { LoginUserDto } from "../../src/admin/crudUsers/domain/dtos/login-user.dto";
import { RegisterUserDto } from "../../src/admin/crudUsers/domain/dtos/register-user.dto";
import { AuthRepositoryImpl } from "../../src/admin/crudUsers/domain/repositories/auth.repository.impl";
import { CustomError } from "../../src/shared/domain/services/custom.error";
import { RegisterUser } from "../../src/admin/crudUsers/domain/services/register-user.use-case";
import { LoginUser } from "../../src/admin/crudUsers/domain/services/login-user.use-case";

export class AuthController {
  constructor(private readonly authRepository: AuthRepositoryImpl) {}

  // This method is used to handle errors in the controller
  // Can be replaced with winston or any other logger
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  // This method is used to register a new user
  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    // Call the RegisterUser use case
    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getUsers = (req: Request, res: Response) => {
    UserModel.findAll()
      .then((users) => {
        res.json({
          users,
          user: req.body.user,
        });
      })
      .catch((error) => this.handleError(error, res));
  };

  deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;

    UserModel.deleteByID(parseInt(id))
      .then((deleted) => {
        if (!deleted) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
      })
      .catch((error) => this.handleError(error, res));
  };

  updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    UserModel.updateByID(parseInt(id), updateData)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", user });
      })
      .catch((error) => this.handleError(error, res));
  };
}
