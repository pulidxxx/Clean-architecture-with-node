import { RowDataPacket, ResultSetHeader } from "mysql2";
import { MySQLDatabase } from "../../../shared/infra/mysql/database";
import { executeQuery } from "../../../shared/infra/mysql/db.mysql";

export class CrudRolesMySQL {
  static async findByID(id: number) {
    const user = await executeQuery("SELECT * FROM rol WHERE id = ?", [id]);
    return user[0];
  }
}
