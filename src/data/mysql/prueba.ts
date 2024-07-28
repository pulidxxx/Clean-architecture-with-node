import { MySQLDatabase } from "./mySQL-database";

async function queryDatabase() {
  try {
    await MySQLDatabase.connect({
      host: "localhost",
      user: "root",
      password: "Hola123456",
      database: "world",
    });

    const [rows] = await MySQLDatabase.connection!.query("SELECT * FROM city");
    console.log(rows);
  } catch (error) {
    console.error("Database query error:", error);
  }
}

queryDatabase();
