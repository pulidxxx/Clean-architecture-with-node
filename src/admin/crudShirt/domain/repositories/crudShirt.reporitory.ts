import { CreateShirtDto } from "../dtos/create-shirt.dto";
import { UpdateShirtDto } from "../dtos/update-shirt.dto";
import { ShirtEntity } from "../models/shirt.model";
import { CrudShirtsService } from "../services/crudShirts.service";

export class CrudShirtsRepository {
  constructor(
    private readonly crudShirtsService: CrudShirtsService
  ) {}

  create(
    createShirtDto: CreateShirtDto
  ): Promise<ShirtEntity> {
    return this.crudShirtsService.create(createShirtDto);
  }

  update(
    idCamisa: number,
    updateShirtDto: UpdateShirtDto
  ): Promise<ShirtEntity> {
    return this.crudShirtsService.update(idCamisa, updateShirtDto);
  }
}
