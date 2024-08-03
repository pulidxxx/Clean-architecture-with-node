import { Request, Response } from "express";
import { CustomError } from "../../src/shared/domain/services/custom.error";
import { CrudMaterialsMySQL } from "../../src/admin/crudMaterials/infra/crudMaterials.mysql";
import { CreateMaterial } from "../../src/admin/crudMaterials/domain/services/create-material.use-case";
import { CreateMaterialDto } from "../../src/admin/crudMaterials/domain/dtos/create-material.dto";
import { CrudMaterialsRepository } from "../../src/admin/crudMaterials/domain/repositories/crudMaterials.reporitory";
import { UpdateMaterialDto } from "../../src/admin/crudMaterials/domain/dtos/update-material.dto";
import { UpdateMaterial } from "../../src/admin/crudMaterials/domain/services/update-material.use-case";

export class CrudMaterials {
  constructor(
    private readonly crudMaterialsRepository: CrudMaterialsRepository
  ) {}

  // This method is used to handle errors in the controller
  // Can be replaced with winston
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  createMaterial = (req: Request, res: Response) => {
    const [error, createMaterialDto] = CreateMaterialDto.create(req.body);
    if (error) return res.status(400).json({ error });

    // Call the CreateMaterial use case
    new CreateMaterial(this.crudMaterialsRepository)
      .execute(createMaterialDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getMaterials = (req: Request, res: Response) => {
    CrudMaterialsMySQL.findAll()
      .then((materials) => {
        res.json({
          materials,
          user: req.body.material,
        });
      })
      .catch((error) => this.handleError(error, res));
  };

  deleteMaterial = (req: Request, res: Response) => {
    const { nombre } = req.params;

    CrudMaterialsMySQL.deleteByName(nombre)
      .then((deleted) => {
        if (!deleted) {
          return res.status(404).json({ error: "Material not found" });
        }
        res.status(200).json({ message: "Material deleted successfully" });
      })
      .catch((error) => this.handleError(error, res));
  };

  updateMaterial = (req: Request, res: Response) => {
    const { nombre } = req.params;
    const [error, updateMaterialDto] = UpdateMaterialDto.create(
      nombre,
      req.body
    );
    if (error) return res.status(400).json({ error });
    new UpdateMaterial(this.crudMaterialsRepository)
      .execute(updateMaterialDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
