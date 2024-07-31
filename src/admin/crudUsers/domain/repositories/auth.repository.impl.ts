import { LoginUserDto } from "../dtos/login-user.dto";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { UserEntity } from "../models/user.model";
import { AuthDatasourceImpl } from "../services/auth.datasource.impl";

export class AuthRepositoryImpl {
  constructor(private readonly authDatasource: AuthDatasourceImpl) {}
  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authDatasource.login(loginUserDto);
  }

  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.register(registerUserDto);
  }
}
