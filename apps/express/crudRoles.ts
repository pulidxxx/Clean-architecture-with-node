import { Request, Response } from "express";
import { CustomError } from "../../src/shared/domain/services/custom.error";
import { CrudRolesMySQL } from "../../src/admin/crudRoles/infra/crudRoles.mysql";
import { CreateRole } from "../../src/admin/crudRoles/domain/services/create-rol.use-case";
import { CreateRoleDto } from "../../src/admin/crudRoles/domain/dtos/create-rol.dto";
import { CrudRolesRepository } from "../../src/admin/crudRoles/domain/repositories/crudRoles.reporitory";
import { UpdateRoleDto } from "../../src/admin/crudRoles/domain/dtos/update-rol.dto";
import { UpdateRole } from "../../src/admin/crudRoles/domain/services/update-rol.use-case";

export class CrudRoles {
  constructor(private readonly crudRolesRepository: CrudRolesRepository) {}

  // This method is used to handle errors in the controller
  // Can be replaced with winston
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  createRole = (req: Request, res: Response) => {
    const [error, createRoleDto] = CreateRoleDto.create(req.body);
    if (error) return res.status(400).json({ error });

    // Call the CreateRole use case
    new CreateRole(this.crudRolesRepository)
      .execute(createRoleDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getRoles = (req: Request, res: Response) => {
    CrudRolesMySQL.findAll()
      .then((roles) => {
        res.json({
          roles,
          user: req.body.role,
        });
      })
      .catch((error) => this.handleError(error, res));
  };

  deleteRole = (req: Request, res: Response) => {
    const { id } = req.params;

    CrudRolesMySQL.deleteByID(parseInt(id))
      .then((deleted) => {
        if (!deleted) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "Role deleted successfully" });
      })
      .catch((error) => this.handleError(error, res));
  };

  updateRole = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateRoleDto] = UpdateRoleDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new UpdateRole(this.crudRolesRepository)
      .execute(parseInt(id), updateRoleDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
