import { Request, Response } from "express";
import { CustomError } from "../../src/shared/domain/services/custom.error";
import { CrudShirtsRepository } from "../../src/admin/crudShirt/domain/repositories/crudShirt.reporitory";
import { CreateShirtDto } from "../../src/admin/crudShirt/domain/dtos/create-shirt.dto";
import { CreateShirt } from "../../src/admin/crudShirt/domain/services/create-shirt.use-case";
import { CrudShirtsMySQL } from "../../src/admin/crudShirt/infra/crudShirt.mysql";
import { UpdateShirt } from "../../src/admin/crudShirt/domain/services/update-shirt.use-case";
import { UpdateShirtDto } from "../../src/admin/crudShirt/domain/dtos/update-shirt.dto";

export class CrudShirts {
  constructor(private readonly crudShirtsRepository: CrudShirtsRepository) {}

  // This method is used to handle errors in the controller
  // Can be replaced with winston
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  createShirt = (req: Request, res: Response) => {
    const [error, createShirtDto] = CreateShirtDto.create(req.body);
    if (error) return res.status(400).json({ error });

    // Call the CreateShirt use case
    new CreateShirt(this.crudShirtsRepository)
      .execute(createShirtDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getShirts = (req: Request, res: Response) => {
    CrudShirtsMySQL.findAll()
      .then((shirts) => {
        res.json({
          shirts,
          user: req.body.shippinginfo,
        });
      })
      .catch((error) => this.handleError(error, res));
  };

  deleteShirt = (req: Request, res: Response) => {
    const { id } = req.params;

    CrudShirtsMySQL.deleteByID(parseInt(id))
      .then((deleted) => {
        console.log(deleted);
        if (deleted.affectedRows === 0) {
          return res.status(404).json({ error: "Shirt not found" });
        }
        res.status(200).json({ message: "Shirt deleted successfully" });
      })
      .catch((error) => this.handleError(error, res));
  };

  updateShirt = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateShirtDto] = UpdateShirtDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new UpdateShirt(this.crudShirtsRepository)
      .execute(parseInt(id), updateShirtDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
