import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../domain/services";
import { CrudUsersMySQL } from "../../../admin/crudUsers/infra/crudUsers.mysql";
import { CustomError } from "../../domain/services/custom.error"; // Assuming you have this for error handling
import { CrudRolesMySQL } from "../../../admin/crudRoles/infra/crudRoles.mysql";

export class AuthRoleMiddleware {
  static validateJWT = (requiredRole: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const authorization = req.header("Authorization");

      if (!authorization) {
        return res.status(401).json({ error: "No token provided" });
      }
      if (!authorization.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Invalid Bearer token" });
      }

      const token = authorization.split(" ")[1] || "";

      try {
        const payload = await JwtAdapter.validateToken<{
          email: string;
          logged: boolean;
        }>(token);
        if (!payload) {
          return res.status(401).json({ error: "Invalid token" });
        }

        if (!payload.logged) {
          return res.status(401).json({ error: "User needs to log in" });
        }

        // Check if the user exists in MySQL
        const user = await CrudUsersMySQL.findByEmail(payload.email);
        if (!user) {
          return res.status(401).json({ error: "User not found" });
        }

        // Find the required role ID
        const roles = await CrudRolesMySQL.findAll();
        const requiredRoleData = roles.find(
          (role: any) => role.nombre === requiredRole
        );
        if (!requiredRoleData) {
          return res.status(500).json({ error: "Required role not found" });
        }
        const requiredRoleId = requiredRoleData.id;

        if (user.rolId !== requiredRoleId) {
          return res
            .status(403)
            .json({ error: `Access denied: ${requiredRole} role required` });
        }

        req.body.user = user;
        next();
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
      }
    };
  };
}
