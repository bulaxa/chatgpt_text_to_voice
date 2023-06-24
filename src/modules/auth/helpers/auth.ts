import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthJwt {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  public async login(username: string, password: string): Promise<string> {
    const user = await this.usersService.findByLogin(username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return await this.jwtService.signAsync(payload);
  }
}
