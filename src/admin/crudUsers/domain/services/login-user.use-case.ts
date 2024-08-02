import { JwtAdapter } from "../../../../shared/domain/services";
import { CustomError } from "../../../../shared/domain/services/custom.error";

import { RegisterUserDto } from "../dtos/register-user.dto";
import { LoginUserDto } from "../dtos/login-user.dto";
import { CrudUsersRepository } from "../repositories/crudUsers.reporitory";

interface UserToken {
  token: string;
  user: {
    nombre: string;
    email: string;
  };
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface LoginUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

// Use case to login a user in the system and return a token and user data
export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authResository: CrudUsersRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    // Login user
    const user = await this.authResository.login(loginUserDto);

    // Check if the user exists
    const token = await this.signToken({ email: user.email }, "2h");
    if (!token) throw CustomError.internalServer("Error generating token");

    return {
      token: token,
      user: {
        nombre: user.nombre,
        email: user.email,
      },
    };
  }
}
