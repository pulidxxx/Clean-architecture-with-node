import { BcryptAdapter } from "../../../../shared/domain/services";

import { UserMapper } from "../mappers/user.mapper";
import { CrudUsersMySQL } from "../../infra/crudUsers.mysql";
import { LoginUserDto } from "../dtos/login-user.dto";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { UserEntity } from "../models/user.model";
import { CustomError } from "../../../../shared/domain/services/custom.error";
import { CrudRolesMySQL } from "../../../crudRoles/infra/crudRoles.mysql";
import { UpdateUserDto } from "../dtos/update-user.dto";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

// Implementation of the AuthDatasource interface to interact with the database and perform operations
export class CrudUsersService {
  // Constructor to inject the hash and compare functions
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      const user = await CrudUsersMySQL.findByEmail(email);
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
    const { nombre, email, password, rolId } = registerUserDto;

    try {
      // 1. Verify whether email exists or no
      const userExists = await CrudUsersMySQL.findByEmail(email);
      if (userExists) throw CustomError.badRequest("User already exists");

      // 2. Verify whether email exists or no
      const rolExists = await CrudRolesMySQL.findByID(rolId);
      if (!rolExists) throw CustomError.badRequest("Rol does not exist");

      // 2. Password hashing
      const userId = await CrudUsersMySQL.create({
        nombre,
        email,
        password: this.hashPassword(password),
        rolId,
      });

      // 3. Mapping to UserEntity
      const user = await CrudUsersMySQL.findByEmail(email); // Fetch the user after creating
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }

  // Method to update a user
  async update(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const { oldEmail, nombre, newEmail, password, rolId } = updateUserDto;

    try {
      // Check if the user exists
      const oldUserExists = await CrudUsersMySQL.findByEmail(oldEmail);
      if (!oldUserExists) throw CustomError.badRequest("User does not exist");

      // Check if the new user doesn't exists
      if (newEmail && newEmail !== oldEmail) {
        const newUserExists = await CrudUsersMySQL.findByEmail(newEmail);
        if (newUserExists)
          throw CustomError.badRequest("Email is already in use");
      }

      // Prepare update data
      const updateData: Partial<{
        nombre: string;
        email: string;
        password: string;
        rolId: number;
      }> = {};

      // Add fields to update data
      if (nombre) updateData.nombre = nombre;
      if (password) updateData.password = this.hashPassword(password);
      if (rolId) {
        const rolExists = await CrudRolesMySQL.findByID(rolId);
        if (!rolExists) throw CustomError.badRequest("Rol does not exist");
        updateData.rolId = rolId;
      }
      if (newEmail) updateData.email = newEmail;

      // Update user in the database
      const updated = await CrudUsersMySQL.updateByEmail(oldEmail, updateData);
      if (!updated) throw CustomError.notFound("Failed to update user");

      // Get the updated user
      const updatedUser = await CrudUsersMySQL.findByEmail(
        updateData.email || oldEmail
      );
      return UserMapper.userEntityFromObject(updatedUser);
    } catch (error) {
      // Handle errors
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }
}
