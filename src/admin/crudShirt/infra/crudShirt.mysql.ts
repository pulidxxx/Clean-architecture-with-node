import {
  deleteRecord,
  executeQuery,
  insertRecord,
  updateRecord,
} from "../../../shared/infra/mysql/db.mysql";

export class CrudShirtsMySQL {
  static async create(camisa: {
    imagen: string;
    precio: string;
    talla: string;
    cantidad: string;
    idEstampado: string;
    nombreMaterial: string;
    numeroPedido: string;
  }) {
    const shirtId = await insertRecord("camisa", camisa);
    return shirtId;
  }

  static async findAll() {
    const shirts = await executeQuery("SELECT * FROM camisa");
    return shirts;
  }

  static async findByID(id: number) {
    const shirt = await executeQuery(
      "SELECT * FROM camisa WHERE idCamisa = ?",
      [id]
    );
    return shirt[0];
  }

  static async updateByID(id: number, updateData: { [key: string]: any }) {
    const updatedShirt = await updateRecord(
      "camisa",
      "idCamisa",
      id,
      updateData
    );

    return updatedShirt;
  }

  static async deleteByID(id: number) {
    return await executeQuery("DELETE FROM camisa WHERE idCamisa = ?", [id]);
  }

  static async findLastAdded() {
    const lastShirt = await executeQuery(
      "SELECT * FROM camisa ORDER BY idCamisa DESC LIMIT 1"
    );
    return lastShirt[0];
  }
}
