import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './entities/user.entity';
import { AuthGuard } from 'src/config/auth.guard';
import GetUserMapper from './mappers/getUser.mapper';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, GetUserMapper],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UsersModule {}
