import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RSAEncryption } from 'src/core/cryptography';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const rsa = new RSAEncryption();
    const { publicKey, privateKey } = rsa.generateKey();
    const payload = {
      sub: user.userId,
      username: user.username,
      publicKey,
      privateKey,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      publicKey,
    };
  }
}
