import { RowDataPacket, ResultSetHeader } from "mysql2";
import { MySQLDatabase } from "../database";

export class UserModel {
  // Users CRUD operations
  static async create(user: { name: string; email: string; password: string }) {
    const [result] = await MySQLDatabase.getPool().query<ResultSetHeader>(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [user.name, user.email, user.password]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await MySQLDatabase.getPool().query<RowDataPacket[]>(
      "SELECT * FROM users"
    );
    return rows;
  }

  static async finByEmail(email: string) {
    const [rows] = await MySQLDatabase.getPool().query<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0];
  }

  static async finByID(id: number) {
    const [rows] = await MySQLDatabase.getPool().query<RowDataPacket[]>(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  static async updateByID(id: number, updateData: { [key: string]: any }) {
    const validFields = ["name", "email", "password"];
    const fieldsToUpdate = Object.keys(updateData)
      .filter((key) => validFields.includes(key))
      .map((key) => `${key} = ?`);

    if (fieldsToUpdate.length === 0) {
      throw new Error("No valid fields to update");
    }

    const query = `UPDATE users SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;
    const values = [
      ...Object.values(updateData).filter((_, index) =>
        validFields.includes(Object.keys(updateData)[index])
      ),
      id,
    ];

    const [result] = await MySQLDatabase.getPool().query<ResultSetHeader>(
      query,
      values
    );

    if (result.affectedRows > 0) {
      const [updatedUser] = await MySQLDatabase.getPool().query<
        RowDataPacket[]
      >("SELECT * FROM users WHERE id = ?", [id]);
      return updatedUser[0];
    }
    return null;
  }

  static async deleteByID(id: number) {
    const [result] = await MySQLDatabase.getPool().query<ResultSetHeader>(
      "DELETE FROM users WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}
