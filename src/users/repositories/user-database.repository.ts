import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { UsersRepository } from './user.repository';

@Injectable()
export class UserDatabaseRepository implements UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDto>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userModel.find();

    return users.map(
      (user) => new UserDto(user._id, user.username, user.email, user.password),
    );
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.userModel.findById(id);
    return new UserDto(user._id, user.username, user.email, user.password);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateUserDto,
      },
      {
        new: true,
      },
    );
    return new UserDto(user._id, user.username, user.email, user.password);
  }

  async remove(id: string): Promise<void> {
    await this.userModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
