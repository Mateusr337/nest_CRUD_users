import { Prop } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  public username: string;

  @IsEmail({ require: true })
  public email: string;

  @IsNotEmpty()
  public password: string;
}
