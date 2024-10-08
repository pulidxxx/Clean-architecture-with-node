import { Request, Response } from "express";
import { CustomError } from "../../src/shared/domain/services/custom.error";
import { CrudOrdersRepository } from "../../src/admin/crudOrder/domain/repositories/crudOrder.reporitory";
import { CreateOrderDto } from "../../src/admin/crudOrder/domain/dtos/create-order.dto";
import { CreateOrder } from "../../src/admin/crudOrder/domain/services/create-order.use-case";
import { CrudOrdersMySQL } from "../../src/admin/crudOrder/infra/crudOrder.mysql";
import { UpdateOrderDto } from "../../src/admin/crudOrder/domain/dtos/update-order.dto";
import { UpdateOrder } from "../../src/admin/crudOrder/domain/services/update-order.use-case";

export class CrudOrders {
  constructor(private readonly crudOrdersRepository: CrudOrdersRepository) {}

  // This method is used to handle errors in the controller
  // Can be replaced with winston
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  createOrder = (req: Request, res: Response) => {
    const [error, createOrderDto] = CreateOrderDto.create(req.body);
    if (error) return res.status(400).json({ error });

    // Call the CreateOrder use case
    new CreateOrder(this.crudOrdersRepository)
      .execute(createOrderDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getOrders = (req: Request, res: Response) => {
    CrudOrdersMySQL.findAll()
      .then((orders) => {
        res.json({
          orders,
          user: req.body.order,
        });
      })
      .catch((error) => this.handleError(error, res));
  };

  deleteOrder = (req: Request, res: Response) => {
    const { numeroPedido } = req.params;

    CrudOrdersMySQL.deleteByID(parseInt(numeroPedido))
      .then((deleted) => {
        if (!deleted) {
          return res.status(404).json({ error: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
      })
      .catch((error) => this.handleError(error, res));
  };

  updateOrder = (req: Request, res: Response) => {
    const { numeroPedido } = req.params;
    const [error, updateOrderDto] = UpdateOrderDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new UpdateOrder(this.crudOrdersRepository)
      .execute(parseInt(numeroPedido), updateOrderDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getOrderDetails = async (req: Request, res: Response) => {
    const { numeroPedido } = req.params; // Suponiendo que el número de pedido se pasa como parámetro de URL

    try {
      const pedidoDetails = await CrudOrdersMySQL.getOrderDetails(
        parseInt(numeroPedido)
      );
      if (!pedidoDetails) {
        return res.status(404).json({ error: "Pedido no encontrado" });
      }

      // Organizar los datos en el formato deseado
      const envio = {
        barrio: pedidoDetails[0].barrio,
        ciudad: pedidoDetails[0].ciudad,
        pais: pedidoDetails[0].pais,
        codigoPostal: pedidoDetails[0].codigoPostal,
        direccion: pedidoDetails[0].direccion,
        telefono: pedidoDetails[0].telefono,
      };

      const camisas = pedidoDetails.map((item: any) => ({
        imagen: item.imagen,
        precio: item.precioCamisa,
        talla: item.talla,
        cantidad: item.cantidadCamisa,
        nombreMaterial: item.nombreMaterial,
        idEstampado: item.idEstampado,
      }));

      const response = {
        numeroPedido: pedidoDetails[0].numeroPedido,
        estadoPedido: pedidoDetails[0].estadoPedido,
        fechaPedido: pedidoDetails[0].fechaPedido,
        fechaEnvio: pedidoDetails[0].fechaEnvio,
        usuario: {
          nombre: pedidoDetails[0].nombreUsuario,
          email: pedidoDetails[0].emailUsuario,
        },
        envio,
        camisas,
      };

      res.json(response);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
