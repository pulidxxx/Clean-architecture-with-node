import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
import { MySQLDatabase } from "./shared/domain/infra/mysql";
import { envs } from "./shared/domain/services";

(() => {
  main();
})();

async function main() {
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
