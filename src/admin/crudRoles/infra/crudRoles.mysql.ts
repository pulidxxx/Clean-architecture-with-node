import {
  deleteRecord,
  executeQuery,
  insertRecord,
  updateRecord,
} from "../../../shared/infra/mysql/db.mysql";

export class CrudRolesMySQL {
  static async create(role: { id: number; nombre: string }) {
    const roleId = await insertRecord("rol", role);
    return roleId;
  }

  static async findAll() {
    const roles = await executeQuery("SELECT * FROM rol");
    return roles;
  }

  static async findByID(id: number) {
    const role = await executeQuery("SELECT * FROM rol WHERE id = ?", [id]);
    return role[0];
  }

  static async findByName(name: string) {
    const role = await executeQuery("SELECT * FROM rol WHERE nombre = ?", [
      name,
    ]);
    return role[0];
  }

  static async updateByID(id: number, updateData: { [key: string]: any }) {
    const updatedRole = await updateRecord("rol", "id", id, updateData);
    return updatedRole;
  }

  static async deleteByID(id: number) {
    return await deleteRecord("rol", id);
  }
}
