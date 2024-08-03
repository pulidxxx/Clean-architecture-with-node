import { CustomError } from "../../../../shared/domain/services/custom.error";
import { CrudShippingInfosMySQL } from "../../infra/crudShippingInfo.mysql";

import { CreateShippingInfoDto } from "../dtos/create-shippingInfo.dto";
import { UpdateShippingInfoDto } from "../dtos/update-shippingInfo.dto";
import { ShippingInfoMapper } from "../mappers/shippingInfo.mapper";
import { ShippingInfoEntity } from "../models/shippingInfo.model";

export class CrudShippingInfosService {
  constructor() {}

  async create(
    createShippingInfoDto: CreateShippingInfoDto
  ): Promise<ShippingInfoEntity> {
    const {
      barrio,
      ciudad,
      pais,
      codigoPostal,
      direccion,
      telefono,
      usuarioEmail,
    } = createShippingInfoDto;

    try {
      const shippinginfosId = await CrudShippingInfosMySQL.create({
        barrio,
        ciudad,
        pais,
        codigoPostal,
        direccion,
        telefono,
        usuarioEmail,
      });

      // 3. Mapping to ShippingInfoEntity
      const shippinginfos = await CrudShippingInfosMySQL.findLastAdded();
      return ShippingInfoMapper.shippinginfosEntityFromObject(shippinginfos);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }

  // Method to update a shippinginfos
  async update(
    id: number,
    updateShippingInfoDto: UpdateShippingInfoDto
  ): Promise<ShippingInfoEntity> {
    const {
      barrio,
      ciudad,
      pais,
      codigoPostal,
      direccion,
      telefono,
      usuarioEmail,
    } = updateShippingInfoDto;
    try {
      const exists = await CrudShippingInfosMySQL.findByID(id);
      if (!exists) throw CustomError.notFound("Shippinginfo doesn't exist");

      // Prepare update data
      const updateData: Partial<{
        barrio: string;
        ciudad: string;
        pais: string;
        codigoPostal: string;
        direccion: string;
        telefono: string;
        usuarioEmail: string;
      }> = {};

      // Add fields to update data
      if (barrio) updateData.barrio = barrio;
      if (ciudad) updateData.ciudad = ciudad;
      if (pais) updateData.pais = pais;
      if (codigoPostal) updateData.codigoPostal = codigoPostal;
      if (direccion) updateData.direccion = direccion;
      if (telefono) updateData.telefono = telefono;
      if (usuarioEmail) updateData.usuarioEmail = usuarioEmail;

      // Update shippinginfos in the database
      const updated = await CrudShippingInfosMySQL.updateByID(id, updateData);
      if (!updated)
        throw CustomError.notFound("Failed to update shippinginfos");

      // Get the updated shippinginfos
      const updatedShippingInfo = await CrudShippingInfosMySQL.findByID(id);
      return ShippingInfoMapper.shippinginfosEntityFromObject(
        updatedShippingInfo
      );
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
