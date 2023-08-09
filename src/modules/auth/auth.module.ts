import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthJwt } from '../auth/helpers/auth';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthJwt],
  exports: [AuthModule],
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: async () => ({
        secret: process.env.JWT_TOKEN,
        signOptions: { expiresIn: '600s' },
      }),
    }),
  ],
})
export class AuthModule {}
