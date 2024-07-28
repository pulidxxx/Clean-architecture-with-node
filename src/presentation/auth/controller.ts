import { Request, Response } from "express";
import {
  AuthRepository,
  CustomError,
  LoginUser,
  LoginUserDto,
  RegisterUser,
  RegisterUserDto,
} from "../../domain";
import { UserModel } from "../../data/mongodb";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

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
    UserModel.find()
      .then((users) => {
        res.json({
          users,
          user: req.body.user,
        });
      })
      .catch(() => res.status(500).json({ error: "Internal server error" }));
  };

  deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;

    UserModel.findByIdAndDelete(id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
      })
      .catch((error) => this.handleError(error, res));
  };

  updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    UserModel.findByIdAndUpdate(id, updateData, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", user });
      })
      .catch((error) => this.handleError(error, res));
  };
}
