import { Injectable } from '@nestjs/common';
import { AuthJwt } from 'src/modules/auth/helpers/auth';

@Injectable()
export class AuthService {
  constructor(private authJwt: AuthJwt) {}

  async signIn(username: string, pass: string): Promise<any> {
    const token = await this.authJwt.login(username, pass);
    return {
      access_token: token,
    };
  }
}
