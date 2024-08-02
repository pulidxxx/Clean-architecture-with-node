import { CustomError } from "../../../../shared/domain/services/custom.error";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { UserEntity } from "../models/user.model";
import { CrudUsersRepository } from "../repositories/crudUsers.reporitory";

interface UpdateUserUseCase {
  execute(updateUserDto: UpdateUserDto): Promise<UserEntity>;
}

export class UpdateUser implements UpdateUserUseCase {
  constructor(private readonly crudUsersRepository: CrudUsersRepository) {}

  async execute(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    // Forward the update request to the repository
    const updatedUser = await this.crudUsersRepository.update(updateUserDto);

    if (!updatedUser) {
      throw CustomError.notFound("Failed to update user");
    }

    return updatedUser;
  }
}
