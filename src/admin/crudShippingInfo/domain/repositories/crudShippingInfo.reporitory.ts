import { CreateShippingInfoDto } from "../dtos/create-shippingInfo.dto";
import { UpdateShippingInfoDto } from "../dtos/update-shippingInfo.dto";
import { ShippingInfoEntity } from "../models/shippingInfo.model";
import { CrudShippingInfosService } from "../services/crudShippingInfos.service";

export class CrudShippingInfosRepository {
  constructor(
    private readonly crudShippingInfosService: CrudShippingInfosService
  ) {}

  create(
    createShippingInfoDto: CreateShippingInfoDto
  ): Promise<ShippingInfoEntity> {
    return this.crudShippingInfosService.create(createShippingInfoDto);
  }

  update(
    id: number,
    updateShippingInfoDto: UpdateShippingInfoDto
  ): Promise<ShippingInfoEntity> {
    return this.crudShippingInfosService.update(id, updateShippingInfoDto);
  }
}
