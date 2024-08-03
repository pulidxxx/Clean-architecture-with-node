import {
  deleteRecord,
  executeQuery,
  insertRecord,
  updateRecord,
} from "../../../shared/infra/mysql/db.mysql";

export class CrudMaterialsMySQL {
  static async create(material: { nombre: string; cantidad: number }) {
    const materialId = await insertRecord("material", material);
    return materialId;
  }

  static async findAll() {
    const materials = await executeQuery("SELECT * FROM material");
    return materials;
  }

  static async findByName(name: string) {
    const material = await executeQuery(
      "SELECT * FROM material WHERE nombre = ?",
      [name]
    );
    return material[0];
  }

  static async updateByName(name: string, updateData: { [key: string]: any }) {
    const validFields = ["nombre", "cantidad"];
    const fieldsToUpdate = Object.keys(updateData)
      .filter((key) => validFields.includes(key))
      .map((key) => `${key} = ?`);

    if (fieldsToUpdate.length === 0) {
      throw new Error("No valid fields to update");
    }
    let newName;

    if (updateData.nombre && updateData.nombre !== name) {
      newName = updateData.nombre;
    } else {
      newName = name;
    }

    // Build the query
    const query = `UPDATE material SET ${fieldsToUpdate.join(
      ", "
    )} WHERE nombre = ?`;
    const values = [
      ...Object.values(updateData).filter((_, index) =>
        validFields.includes(Object.keys(updateData)[index])
      ),
      name,
    ];
    const result = await executeQuery(query, values);

    if (result.affectedRows > 0) {
      const updatedMaterial = await executeQuery(
        "SELECT * FROM material WHERE nombre = ?",
        [newName]
      );

      return updatedMaterial[0];
    }
    return null;
  }

  static async deleteByName(name: string) {
    console.log("name", name);
    const result = await executeQuery("DELETE FROM material WHERE nombre = ?", [
      name,
    ]);
    return result.affectedRows > 0;
  }
}
