import { UsersMemoryRepository } from './repositories/user-memory.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let database: UsersMemoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UserRepository, useClass: UsersMemoryRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    database = module.get(UserRepository);
    database.resetDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should answer with create user', async () => {
    const createUserDto = new CreateUserDto(
      'mateus',
      'mateus@email.com',
      'minha-senha',
    );

    await service.create(createUserDto);
    const user = await database.findByEmail(createUserDto.email);

    expect(user).toBeDefined();
  });

  it('should answer with users array', async () => {
    await createUser();
    const users = await service.findAll();

    expect(users).toHaveLength(1);
  });

  it('should answer with create user search by id', async () => {
    const createdUser = await createUser();
    const user = await service.findOne(createdUser._id);

    expect(user).toBeDefined();
  });

  it('should answer with update user', async () => {
    const createdUser = await createUser();
    const updateUsername = 'new-name';

    const updatedUser = await service.update(createdUser._id, {
      username: updateUsername,
    });

    expect(updatedUser.username).toEqual(updateUsername);
  });

  it('should delete user', async () => {
    const createdUser = await createUser();

    await service.remove(createdUser._id);
    const users = await database.findAll();

    expect(users).toHaveLength(0);
  });

  async function createUser(): Promise<UserDto> {
    const createUserDto = new CreateUserDto(
      'mateus',
      'mateus@email.com',
      'minha-senha',
    );

    return await service.create(createUserDto);
  }
});
