import { CreateUserDto } from './../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';

export class UsersMemoryRepository implements UserRepository {
  private users: UserDto[] = [];
  private lastId: number | null;

  constructor() {
    this.users = [];
    this.lastId = null;
  }

  async findOne(id: string): Promise<UserDto> {
    return this.users.find((user) => user._id === id);
  }

  async findByEmail(email: string): Promise<UserDto> {
    return this.users.find((user) => user.email === email);
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const _id = this.lastId === null ? 0 : this.lastId + 1;

    const userDto = new UserDto(
      `${_id}`,
      createUserDto.username,
      createUserDto.email,
      createUserDto.password,
    );

    this.users.push(userDto);
    this.lastId = _id;
    return userDto;
  }

  async findAll(): Promise<UserDto[]> {
    return this.users;
  }

  async update(id: string, userUpdateData: UpdateUserDto): Promise<UserDto> {
    const user = this.users.map((user) => {
      if (user._id === id) {
        user = { ...user, ...userUpdateData };
      }
      return user;
    });

    if (user.length === 0) throw Error('Not found user');

    const userDto = new UserDto(
      user[0]._id,
      user[0].username,
      user[0].email,
      user[0].password,
    );

    return userDto;
  }

  remove(id: string): Promise<void> {
    const newUsers = this.users.filter((user) => user._id !== id);
    this.users = newUsers;

    return;
  }

  resetDatabase() {
    this.users = [];
  }
}
