import { RowDataPacket, ResultSetHeader } from "mysql2";
import { MySQLDatabase } from "../../../shared/infra/mysql/database";
import {
  commitTransaction,
  deleteRecord,
  executeQuery,
  insertRecord,
  rollbackTransaction,
  startTransaction,
  updateRecord,
} from "../../../shared/infra/mysql/db.mysql";

export class CrudUsersMySQL {
  static async create(user: {
    nombre: string;
    email: string;
    password: string;
    rolId: number;
  }) {
    const userId = await insertRecord("usuario", user);
    return userId;
  }

  static async findAll() {
    const users = await executeQuery("SELECT * FROM usuario");
    return users;
  }

  static async findByEmail(email: string) {
    const user = await executeQuery("SELECT * FROM usuario WHERE email = ?", [
      email,
    ]);
    return user[0];
  }

  static async updateByEmail(
    oldEmail: string,
    updateData: { [key: string]: any }
  ) {
    const validFields = ["nombre", "password", "rolId", "email"];
    const fieldsToUpdate = Object.keys(updateData)
      .filter((key) => validFields.includes(key))
      .map((key) => `${key} = ?`);

    if (fieldsToUpdate.length === 0) {
      throw new Error("No valid fields to update");
    }
    let newEmail = updateData.email ? updateData.email : oldEmail;

    // Build the query
    const query = `UPDATE usuario SET ${fieldsToUpdate.join(
      ", "
    )} WHERE email = ?`;
    const values = [
      ...Object.values(updateData).filter((_, index) =>
        validFields.includes(Object.keys(updateData)[index])
      ),
      oldEmail,
    ];
    const result = await executeQuery(query, values);

    if (result.affectedRows > 0) {
      const updatedUser = await executeQuery(
        "SELECT * FROM usuario WHERE email = ?",
        [newEmail]
      );

      return updatedUser[0];
    }
    return null;
  }

  static async deleteByEmail(email: string): Promise<boolean> {
    const connection = await MySQLDatabase.getPool().getConnection();

    try {
      await connection.beginTransaction();

      await connection.query("DELETE FROM pedido WHERE usuarioEmail = ?", [
        email,
      ]);
      await connection.query(
        "DELETE FROM informacion_envio WHERE usuarioEmail = ?",
        [email]
      );
      await connection.query("DELETE FROM estampado WHERE usuarioEmail = ?", [
        email,
      ]);
      await connection.query("DELETE FROM camisetas WHERE usuarioEmail = ?", [
        email,
      ]);

      const [result] = await connection.query<ResultSetHeader>(
        "DELETE FROM usuario WHERE email = ?",
        [email]
      );

      await connection.commit();
      connection.release();

      return result.affectedRows > 0;
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  }
  static async filterUsers(filters: { [key: string]: any }): Promise<any[]> {
    const validFields = ["nombre", "email", "rolId"];
    const fieldsToFilter: string[] = [];
    const values: any[] = [];

    // Construct filter conditions
    Object.keys(filters).forEach((key) => {
      if (validFields.includes(key)) {
        if (key === "nombre" || key === "email") {
          // Use LIKE for partial matching
          fieldsToFilter.push(`${key} LIKE ?`);
          values.push(`%${filters[key]}%`);
        } else {
          // Use = for exact matching
          fieldsToFilter.push(`${key} = ?`);
          values.push(filters[key]);
        }
      }
    });

    // Build the query
    let query = "SELECT * FROM usuario WHERE 1=1";
    if (fieldsToFilter.length > 0) {
      query += " AND " + fieldsToFilter.join(" AND ");
    }

    return await executeQuery(query, values);
  }

  static async getAllArtistas(): Promise<any[]> {
    const query = `
    SELECT 
      u.email,
      u.nombre AS nombreUsuario,
      e.idEstampado,
      e.nombre AS nombreEstampado,
      e.diseño AS diseñoEstampado
    FROM 
      usuario u
    LEFT JOIN 
      estampado e ON u.email = e.usuarioEmail
    WHERE 
      u.rolId = 2;
  `;

    return await executeQuery(query, []);
  }
}
