import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RSAEncryption } from 'src/core/cryptography';
import { IResponse } from 'src/core/response-schema';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getAuthenPayload(user) {
    const rsa = new RSAEncryption();
    const { publicKey, privateKey } = rsa.generateKey();
    const payload = {
      sub: user.userId,
      email: user.email,
      publicKey,
      privateKey,
    };
    const response = {
      accessToken: await this.jwtService.signAsync(payload),
      publicKey,
    };
    return response;
  }

  async register(dto: CreateUserDto): Promise<IResponse> {
    console.log('register', dto);
    const dataResponse = await this.getAuthenPayload({ id: 1, email: 'tee' });
    return {
      statusCode: 201,
      message: '',
      data: dataResponse,
    };
  }

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
