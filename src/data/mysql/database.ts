import mysql from "mysql2/promise";

interface MySQLConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

export class MySQLDatabase {
  private static pool: mysql.Pool | null = null;

  static async connect(config: MySQLConfig) {
    const { host, user, password, database } = config;

    try {
      this.pool = mysql.createPool({
        host,
        user,
        password,
        database,
      });

      console.log("MySQL connected");
      return true;
    } catch (error) {
      console.error("MySQL connection error", error);
      throw error;
    }
  }

  static getPool() {
    if (!this.pool) {
      throw new Error("Database connection is not established");
    }
    return this.pool;
  }
}
