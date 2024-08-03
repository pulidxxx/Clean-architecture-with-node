import { CustomError } from "../../../../shared/domain/services/custom.error";
import { UpdateShippingInfoDto } from "../dtos/update-shippingInfo.dto";
import { ShippingInfoEntity } from "../models/shippingInfo.model";
import { CrudShippingInfosRepository } from "../repositories/crudShippingInfo.reporitory";

interface UpdateShippingInfoUseCase {
  execute(
    id: number,
    updateShippingInfoDto: UpdateShippingInfoDto
  ): Promise<ShippingInfoEntity>;
}

export class UpdateShippingInfo implements UpdateShippingInfoUseCase {
  constructor(
    private readonly crudShippingInfosRepository: CrudShippingInfosRepository
  ) {}

  async execute(
    id: number,
    updateShippingInfoDto: UpdateShippingInfoDto
  ): Promise<ShippingInfoEntity> {
    // Forward the update request to the repository
    const updatedShippingInfo = await this.crudShippingInfosRepository.update(
      id,
      updateShippingInfoDto
    );

    if (!updatedShippingInfo) {
      throw CustomError.notFound("Failed to update shippinginfo");
    }

    return updatedShippingInfo;
  }
}
