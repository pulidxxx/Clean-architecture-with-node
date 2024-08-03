import {
  deleteRecord,
  executeQuery,
  insertRecord,
  updateRecord,
} from "../../../shared/infra/mysql/db.mysql";

export class CrudShippingInfosMySQL {
  static async create(shippinginfo: {
    barrio: string;
    ciudad: string;
    pais: string;
    codigoPostal: string;
    direccion: string;
    telefono: string;
    usuarioEmail: string;
  }) {
    const shippinginfoId = await insertRecord(
      "informacion_envio",
      shippinginfo
    );
    return shippinginfoId;
  }

  static async findAll() {
    const shippinginfos = await executeQuery("SELECT * FROM informacion_envio");
    return shippinginfos;
  }

  static async findByID(id: number) {
    const shippinginfo = await executeQuery(
      "SELECT * FROM informacion_envio WHERE id = ?",
      [id]
    );
    return shippinginfo[0];
  }

  static async updateByID(id: number, updateData: { [key: string]: any }) {
    const updatedShippingInfo = await updateRecord(
      "informacion_envio",
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
