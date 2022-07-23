import { UserDatabaseRepository } from './repositories/user-database.repository';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UsersRepository } from './repositories/user.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: UsersRepository, useClass: UserDatabaseRepository },
  ],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UsersModule {}
