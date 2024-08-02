import express, { Router } from "express";

interface Options {
  port?: number;
  routes: Router;
}
export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port = 3100, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  async start() {
    // Mmiddleware that allows the server to accept JSON data
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true })); // Accept form data

    // Add the routes to the server
    this.app.use(this.routes);

    // Start the server on the specified port
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
