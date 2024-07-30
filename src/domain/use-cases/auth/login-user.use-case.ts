import { LoginUserDto } from "../../../shared/domain/dtos/login-user.dto";
import { RegisterUserDto } from "../../../shared/domain/dtos/register-user.dto";
import { JwtAdapter } from "../../../shared/domain/services";
import { CustomError } from "../../../shared/domain/services/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
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
    private readonly authResository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    // Login user
    const user = await this.authResository.login(loginUserDto);

    // Check if the user exists
    const token = await this.signToken({ id: user.id }, "2h");
    if (!token) throw CustomError.internalServer("Error generating token");

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
