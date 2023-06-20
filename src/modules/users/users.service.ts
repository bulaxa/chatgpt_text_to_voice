import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  //teste
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'rafael',
      password: '12345',
    },
  ];

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return 'This action adds a new user';
  }

  async findOne(username: string): Promise<User | undefined> {
    try {
      const userData = this.users.find((user) => user.username === username);
      return userData;
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
