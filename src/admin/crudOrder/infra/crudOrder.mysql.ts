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

  static async getOrderDetails(numeroPedido: number): Promise<any> {
    const query = `
    SELECT 
      p.numeroPedido,
      p.valor AS valorPedido,
      p.estado AS estadoPedido,
      p.fechaPedido,
      p.fechaEnvio,
      u.nombre AS nombreUsuario,
      u.email AS emailUsuario,
      ie.barrio,
      ie.ciudad,
      ie.pais,
      ie.codigoPostal,
      ie.direccion,
      ie.telefono,
      c.imagen,
      c.precio AS precioCamisa,
      c.talla,
      c.cantidad AS cantidadCamisa,
      c.nombreMaterial,
      c.idEstampado
    FROM 
      pedido p
    JOIN 
      usuario u ON p.usuarioEmail = u.email
    JOIN 
      informacion_envio ie ON p.informacionEnvioId = ie.id
    JOIN 
      camisa c ON p.numeroPedido = c.numeroPedido
    WHERE 
      p.numeroPedido = ?;
  `;

    const values = [numeroPedido];

    return await executeQuery(query, values);
  }
}
