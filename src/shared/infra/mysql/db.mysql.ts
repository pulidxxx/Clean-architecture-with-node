import { MySQLDatabase } from "./database";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export async function insertRecord(table: string, data: any): Promise<number> {
  const columns = Object.keys(data).join(", ");
  const values = Object.values(data);
  const placeholders = values.map(() => "?").join(", ");

  const [result] = await MySQLDatabase.getPool().query<ResultSetHeader>(
    `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`,
    values
  );
  return result.insertId;
}
export async function updateRecord(
  table: string,
  idField: string,
  id: number,
  data: any
): Promise<any> {
  const validFields = Object.keys(data);
  const setClause = validFields.map((field) => `${field} = ?`).join(", ");

  const [result] = await MySQLDatabase.getPool().query<ResultSetHeader>(
    `UPDATE ${table} SET ${setClause} WHERE ${idField} = ?`,
    [...Object.values(data), id]
  );

  if (result.affectedRows > 0) {
    const [updatedRecord] = await MySQLDatabase.getPool().query<
      RowDataPacket[]
    >(`SELECT * FROM ${table} WHERE ${idField} = ?`, [id]);

    return updatedRecord[0];
  }
  return null;
}

export async function executeQuery(
  query: string,
  params: any[] = []
): Promise<any> {
  const [rows] = await MySQLDatabase.getPool().query<RowDataPacket[]>(
    query,
    params
  );
  return rows;
}

export async function deleteRecord(
  table: string,
  id: number
): Promise<boolean> {
  const [result] = await MySQLDatabase.getPool().query<ResultSetHeader>(
    `DELETE FROM ${table} WHERE id = ?`,
    [id]
  );
  return result.affectedRows > 0;
}
export async function startTransaction() {
  const connection = await MySQLDatabase.getPool().getConnection();
  await connection.beginTransaction();
  return connection;
}

export async function commitTransaction(connection: any) {
  await connection.commit();
  connection.release();
}

export async function rollbackTransaction(connection: any) {
  await connection.rollback();
  connection.release();
}
