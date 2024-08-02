import { JwtAdapter } from "../../../../shared/domain/services";
import { CustomError } from "../../../../shared/domain/services/custom.error";

import { RegisterUserDto } from "../dtos/register-user.dto";
import { CrudUsersRepository } from "../repositories/crudUsers.reporitory";

interface UserToken {
  token: string;
  user: {
    nombre: string;
    email: string;
  };
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

// Use case to register a new user in the system and return a token and user data
export class RegisterUser implements RegisterUserUseCase {
  constructor(
    private readonly authResository: CrudUsersRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  // Register user
  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
    // Register user
    const user = await this.authResository.register(registerUserDto);

    // Check if the user exists
    // Create a token using the user email as payload
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
