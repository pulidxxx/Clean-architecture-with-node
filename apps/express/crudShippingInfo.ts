import { Request, Response } from "express";
import { CustomError } from "../../src/shared/domain/services/custom.error";
import { CrudShippingInfosRepository } from "../../src/admin/crudShippingInfo/domain/repositories/crudShippingInfo.reporitory";
import { CreateShippingInfoDto } from "../../src/admin/crudShippingInfo/domain/dtos/create-shippingInfo.dto";
import { CreateShippingInfo } from "../../src/admin/crudShippingInfo/domain/services/create-shippingInfo.use-case";
import { CrudShippingInfosMySQL } from "../../src/admin/crudShippingInfo/infra/crudShippingInfo.mysql";
import { UpdateShippingInfo } from "../../src/admin/crudShippingInfo/domain/services/update-shippingInfo.use-case";
import { UpdateShippingInfoDto } from "../../src/admin/crudShippingInfo/domain/dtos/update-shippingInfo.dto";

export class CrudShippingInfos {
  constructor(
    private readonly crudShippingInfosRepository: CrudShippingInfosRepository
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

  createShippingInfo = (req: Request, res: Response) => {
    const [error, createShippingInfoDto] = CreateShippingInfoDto.create(
      req.body
    );
    if (error) return res.status(400).json({ error });

    // Call the CreateShippingInfo use case
    new CreateShippingInfo(this.crudShippingInfosRepository)
      .execute(createShippingInfoDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getShippingInfos = (req: Request, res: Response) => {
    CrudShippingInfosMySQL.findAll()
      .then((shippinginfoss) => {
        res.json({
          shippinginfoss,
          user: req.body.shippinginfos,
        });
      })
      .catch((error) => this.handleError(error, res));
  };

  deleteShippingInfo = (req: Request, res: Response) => {
    const { id } = req.params;

    CrudShippingInfosMySQL.deleteByID(parseInt(id))
      .then((deleted) => {
        if (!deleted) {
          return res.status(404).json({ error: "ShippingInfo not found" });
        }
        res.status(200).json({ message: "ShippingInfo deleted successfully" });
      })
      .catch((error) => this.handleError(error, res));
  };

  updateShippingInfo = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateShippingInfoDto] = UpdateShippingInfoDto.create(
      req.body
    );
    if (error) return res.status(400).json({ error });

    new UpdateShippingInfo(this.crudShippingInfosRepository)
      .execute(parseInt(id), updateShippingInfoDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
