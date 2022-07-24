import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserDatabaseRepository implements UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDto>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findAll(): Promise<UserDto[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(
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
  }

  async remove(id: string): Promise<void> {
    await this.userModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
