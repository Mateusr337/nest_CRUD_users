import { User } from '../entities/user.entity';

export class UserDto implements User {
  constructor(
    public _id: string,
    public username: string,
    public email: string,
    public password: string,
  ) {}
}
