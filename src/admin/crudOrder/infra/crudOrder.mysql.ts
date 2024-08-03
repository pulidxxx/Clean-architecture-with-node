import {
  deleteRecord,
  executeQuery,
  insertRecord,
  updateRecord,
} from "../../../shared/infra/mysql/db.mysql";

export class CrudOrdersMySQL {
  static async create(order: {
    valor: number;
    estado: string;
    fechaPedido: string;
    fechaEnvio: string;
    usuarioEmail: string;
    informacionEnvioId: string;
  }) {
    const orderId = await insertRecord("pedido", order);
    return orderId;
  }

  static async findAll() {
    const orders = await executeQuery("SELECT * FROM pedido");
    return orders;
  }

  static async findByID(id: number) {
    const order = await executeQuery(
      "SELECT * FROM pedido WHERE numeroPedido = ?",
      [id]
    );
    return order[0];
  }

  static async updateByID(id: number, updateData: { [key: string]: any }) {
    const updatedOrder = await updateRecord(
      "pedido",
      "numeroPedido",
      id,
      updateData
    );

    return updatedOrder;
  }

  static async deleteByID(numeroPedido: number) {
    const result = await executeQuery(
      "DELETE FROM pedido WHERE numeroPedido = ?",
      [numeroPedido]
    );
    return result.affectedRows > 0;
  }

  static async findLastAdded() {
    const lastOrder = await executeQuery(
      "SELECT * FROM pedido ORDER BY numeroPedido  DESC LIMIT 1"
    );
    return lastOrder[0];
  }
}
