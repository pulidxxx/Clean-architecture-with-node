import { MySQLDatabase } from "../database";
import { RowDataPacket, ResultSetHeader } from "mysql2";
export class UserModel {
  static async findOne(email: string) {
    const [rows] = await MySQLDatabase.getPool().query<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0];
  }

  static async create(user: { name: string; email: string; password: string }) {
    const [result] = await MySQLDatabase.getPool().query<ResultSetHeader>(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [user.name, user.email, user.password]
    );
    return result.insertId;
  }
}
