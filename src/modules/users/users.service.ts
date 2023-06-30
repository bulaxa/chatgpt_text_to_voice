import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserEntity from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthGuard } from 'src/config/auth.guard';
import GetUserMapper from './mappers/getUser.mapper';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private authGuard: AuthGuard,
    private userMapper: GetUserMapper,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOneBy({
      username: createUserDto.username,
    });

    if (user) {
      throw new HttpException('Usuário já existe', HttpStatus.BAD_REQUEST);
    }
    createUserDto.password = await this.authGuard.cryptPassword(
      createUserDto.password,
    );
    const userData = this.usersRepository.save(createUserDto);
    return userData;
  }

  async findAll() {
    try {
      return this.usersRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number): Promise<GetUserDto> {
    try {
      const userData = await this.usersRepository.findOneBy({ id });
      return this.userMapper.getUser(userData);
    } catch (error) {
      console.log(error);
    }
  }

  async findByLogin(username: string): Promise<UserEntity> {
    try {
      return await this.usersRepository.findOneBy({
        username: username,
        isActive: true,
      });
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
