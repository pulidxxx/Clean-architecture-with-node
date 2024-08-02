import { LoginUserDto } from "../dtos/login-user.dto";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { UserEntity } from "../models/user.model";
import { CrudUsersService } from "../services/crudUsers.service";

export class CrudUsersRepository {
  constructor(private readonly crudUsersService: CrudUsersService) {}
  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.crudUsersService.login(loginUserDto);
  }

  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.crudUsersService.register(registerUserDto);
  }

  update(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.crudUsersService.update(updateUserDto);
  }
}
