import { CustomError } from "../../../../shared/domain/services/custom.error";
import { CrudShirtsMySQL } from "../../infra/crudShirt.mysql";

import { CreateShirtDto } from "../dtos/create-shirt.dto";
import { UpdateShirtDto } from "../dtos/update-shirt.dto";
import { ShirtMapper } from "../mappers/shirt.mapper";
import { ShirtEntity } from "../models/shirt.model";

export class CrudShirtsService {
  constructor() {}

  async create(createShirtDto: CreateShirtDto): Promise<ShirtEntity> {
    const {
      imagen,
      precio,
      talla,
      cantidad,
      idEstampado,
      nombreMaterial,
      numeroPedido,
    } = createShirtDto;

    try {
      const shirtId = await CrudShirtsMySQL.create({
        imagen,
        precio,
        talla,
        cantidad,
        idEstampado,
        nombreMaterial,
        numeroPedido,
      });

      // 3. Mapping to ShirtEntity
      const shirt = await CrudShirtsMySQL.findLastAdded();
      return ShirtMapper.shirtEntityFromObject(shirt);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }

  // Method to update a shirt
  async update(
    id: number,
    updateShirtDto: UpdateShirtDto
  ): Promise<ShirtEntity> {
    const {
      imagen,
      precio,
      talla,
      cantidad,
      idEstampado,
      nombreMaterial,
      numeroPedido,
    } = updateShirtDto;
    try {
      const exists = await CrudShirtsMySQL.findByID(id);
      if (!exists) throw CustomError.notFound("Shirt doesn't exist");

      // Prepare update data
      const updateData: Partial<{
        imagen: string;
        precio: string;
        talla: string;
        cantidad: string;
        idEstampado: string;
        nombreMaterial: string;
        numeroPedido: string;
      }> = {};

      // Add fields to update data
      if (imagen) updateData.imagen = imagen;
      if (precio) updateData.precio = precio;
      if (talla) updateData.talla = talla;
      if (cantidad) updateData.cantidad = cantidad;
      if (idEstampado) updateData.idEstampado = idEstampado;
      if (nombreMaterial) updateData.nombreMaterial = nombreMaterial;
      if (numeroPedido) updateData.numeroPedido = numeroPedido;

      // Update shirt in the database
      const updated = await CrudShirtsMySQL.updateByID(id, updateData);
      if (!updated) throw CustomError.notFound("Failed to update shirt");

      // Get the updated shirt
      const updatedShirt = await CrudShirtsMySQL.findByID(id);
      return ShirtMapper.shirtEntityFromObject(updatedShirt);
    } catch (error) {
      // Handle errors
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }
}
