import { UserEntity } from "../../shared/domain/models/user.model";
import { LoginUserDto, RegisterUserDto } from "..";

export abstract class AuthDatasource {
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
