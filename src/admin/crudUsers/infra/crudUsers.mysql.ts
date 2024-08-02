import { RowDataPacket, ResultSetHeader } from "mysql2";
import { MySQLDatabase } from "../../../shared/infra/mysql/database";
import {
  deleteRecord,
  executeQuery,
  insertRecord,
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

  static async deleteByEmail(email: string) {
    const result = await executeQuery("DELETE FROM usuario WHERE email = ?", [
      email,
    ]);
    return result.affectedRows > 0;
  }
}
