import mysql from "mysql2/promise";

interface Options {
  host: string;
  user: string;
  password: string;
  database: string;
}

export class MySQLDatabase {
  static connection: mysql.Pool | null = null;

  static async connect(options: Options) {
    const { host, user, password, database } = options;

    try {
      this.connection = mysql.createPool({
        host,
        user,
        password,
        database,
      });

      console.log("MySQL connected");
      return true;
    } catch (error) {
      console.log("MySQL connection error");
      throw error;
    }
  }
}
