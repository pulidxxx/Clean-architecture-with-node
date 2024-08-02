import { AppRoutes } from "./routes";
import { Server } from "./server";
import { MySQLDatabase } from "./shared/infra/mysql/database";
import { envs } from "./shared/domain/services";

(() => {
  main();
})();

async function main() {
  // Connect to the database
  await MySQLDatabase.connect({
    host: envs.MYSQL_HOST,
    user: envs.MYSQL_USER,
    password: envs.MYSQL_PASSWORD,
    database: envs.MYSQL_DATABASE,
  });

  // Start the server
  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  }).start();
}
