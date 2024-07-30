import { BcryptAdapter } from "../../shared/domain/services";

import {
  AuthDatasource,
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { UserMapper } from "../mappers/user.mapper";
import { UserModel } from "../../shared/domain/infra/mysql/models/user.model";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

// Implementation of the AuthDatasource interface to interact with the database and perform operations
export class AuthDatasourceImpl implements AuthDatasource {
  // Constructor to inject the hash and compare functions
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      const user = await UserModel.finByEmail(email);
      if (!user) throw CustomError.badRequest("User does not exist - email");

      const isMatching = this.comparePassword(password, user.password);
      if (!isMatching) throw CustomError.badRequest("Password is not valid");

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      // 1. Verify whether email exists or no
      const exists = await UserModel.finByEmail(email);
      if (exists) throw CustomError.badRequest("User already exists");

      // 2. Password hashing
      const userId = await UserModel.create({
        name,
        email,
        password: this.hashPassword(password),
      });

      // 3. Mapping to UserEntity
      const user = await UserModel.finByEmail(email); // Fetch the user after creating
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
