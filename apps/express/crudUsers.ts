import { Request, Response } from "express";
import { CrudUsersMySQL } from "../../src/admin/crudUsers/infra/crudUsers.mysql";
import { UpdateUserDto } from "../../src/admin/crudUsers/domain/dtos/update-user.dto";
import { LoginUserDto } from "../../src/admin/crudUsers/domain/dtos/login-user.dto";
import { RegisterUserDto } from "../../src/admin/crudUsers/domain/dtos/register-user.dto";
import { CrudUsersRepository } from "../../src/admin/crudUsers/domain/repositories/crudUsers.reporitory";
import { CustomError } from "../../src/shared/domain/services/custom.error";
import { RegisterUser } from "../../src/admin/crudUsers/domain/services/register-user.use-case";
import { LoginUser } from "../../src/admin/crudUsers/domain/services/login-user.use-case";
import { UpdateUser } from "../../src/admin/crudUsers/domain/services/update-user.use-case";

export class CrudUsers {
  constructor(private readonly crudUsersRepository: CrudUsersRepository) {}

  // This method is used to handle errors in the controller
  // Can be replaced with winston
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    // Call the RegisterUser use case
    new RegisterUser(this.crudUsersRepository)
      .execute(registerUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new LoginUser(this.crudUsersRepository)
      .execute(loginUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getUsers = (req: Request, res: Response) => {
    CrudUsersMySQL.findAll()
      .then((users) => {
        res.json({
          users,
          user: req.body.user,
        });
      })
      .catch((error) => this.handleError(error, res));
  };

  deleteUser = (req: Request, res: Response) => {
    const { email } = req.params;

    CrudUsersMySQL.deleteByEmail(email)
      .then((deleted) => {
        if (!deleted) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
      })
      .catch((error) => this.handleError(error, res));
  };

  updateUser = (req: Request, res: Response) => {
    const { oldEmail } = req.params;
    const [error, updateUserDto] = UpdateUserDto.create(oldEmail, req.body);
    if (error) return res.status(400).json({ error });

    new UpdateUser(this.crudUsersRepository)
      .execute(updateUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  filterUsers = (req: Request, res: Response) => {
    const filters = req.body;

    CrudUsersMySQL.filterUsers(filters)
      .then((users) => {
        if (!users) {
          return res.status(404).json({ error: "Users not found" });
        }
        res.json(users);
      })
      .catch((error) => this.handleError(error, res));
  };

  getAllArtistas = async (req: Request, res: Response) => {
    try {
      const artistas = await CrudUsersMySQL.getAllArtistas();
      if (!artistas) {
        return res.status(404).json({ error: "No se encontraron artistas" });
      }

      // Organizar los datos en el formato deseado
      const response = artistas.reduce((acc: any, item: any) => {
        const {
          email,
          nombreUsuario,
          idEstampado,
          nombreEstampado,
          diseñoEstampado,
        } = item;

        // Agregar usuario al acumulador si no existe
        if (!acc[email]) {
          acc[email] = {
            nombre: nombreUsuario,
            email,
            estampados: [],
          };
        }

        // Agregar estampado al usuario correspondiente
        if (idEstampado) {
          acc[email].estampados.push({
            idEstampado,
            nombreEstampado,
            diseñoEstampado,
          });
        }

        return acc;
      }, {});

      // Convertir el objeto a un array para la respuesta
      const responseArray = Object.values(response);

      res.json(responseArray);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
