import { UserDto } from '../dto/user.dto';
import { CreateUserDto } from './../dto/create-user.dto';
import { UpdateUserDto } from './../dto/update-user.dto';

export abstract class UsersRepository {
  abstract create(UserInsertData: CreateUserDto): Promise<UserDto>;
  abstract findAll(): Promise<UserDto[]>;
  abstract findOne(id: string): Promise<UserDto>;
  abstract update(id: string, userUpdateData: UpdateUserDto): Promise<UserDto>;
  abstract remove(id: string): Promise<void>;
}
