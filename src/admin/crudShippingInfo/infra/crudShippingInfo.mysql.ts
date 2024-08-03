import {
  deleteRecord,
  executeQuery,
  insertRecord,
  updateRecord,
} from "../../../shared/infra/mysql/db.mysql";

export class CrudShippingInfosMySQL {
  static async create(shippinginfos: {
    barrio: string;
    ciudad: string;
    pais: string;
    codigoPostal: string;
    direccion: string;
    telefono: string;
    usuarioEmail: string;
  }) {
    const shippinginfosId = await insertRecord(
      "informacion_envio",
      shippinginfos
    );
    return shippinginfosId;
  }

  static async findAll() {
    const shippinginfoss = await executeQuery(
      "SELECT * FROM informacion_envio"
    );
    return shippinginfoss;
  }

  static async findByID(id: number) {
    const shippinginfos = await executeQuery(
      "SELECT * FROM informacion_envio WHERE id = ?",
      [id]
    );
    return shippinginfos[0];
  }

  static async updateByID(id: number, updateData: { [key: string]: any }) {
    const updatedShippingInfo = await updateRecord(
      "informacion_envio",
      "id",
      id,
      updateData
    );

    return updatedShippingInfo;
  }

  static async deleteByID(id: number) {
    return await deleteRecord("informacion_envio", id);
  }

  static async findLastAdded() {
    const lastShippingInfo = await executeQuery(
      "SELECT * FROM informacion_envio ORDER BY id DESC LIMIT 1"
    );
    return lastShippingInfo[0];
  }
}
