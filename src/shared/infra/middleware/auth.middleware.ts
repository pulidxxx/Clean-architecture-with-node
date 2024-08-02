import { NextFunction, Request, Response } from "express";

import { JwtAdapter } from "../../domain/services";
import { CrudUsersMySQL } from "../../../admin/crudUsers/infra/crudUsers.mysql";

export class AuthMiddleware {
  static validateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authorization = req.header("Authorization");

    if (!authorization) {
      return res.status(401).json({ error: "No token provided" });
    }
    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Invalid Bearer token" });
    }

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.validateToken<{ email: string }>(token);
      if (!payload) {
        return res.status(401).json({ error: "Invalid token" });
      }

      // Check if the user exists in MySQL
      const user = await CrudUsersMySQL.findByEmail(payload.email);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      req.body.user = user;
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
