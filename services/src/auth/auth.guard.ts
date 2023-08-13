import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CRYPTOGRAPHY_KEY } from 'src/core/cryptography.decorator';
import { ROLES_KEY } from 'src/core/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractCryptography(
    context: ExecutionContext,
    request: Request,
    payload,
  ) {
    const body = {};
    const cryptography = this.reflector.get<string>(
      CRYPTOGRAPHY_KEY,
      context.getHandler(),
    );
    if (cryptography) {
      console.log("request['body']", request['body']);
      console.log('cryptography', cryptography);
      console.log('payload', payload);
    }
    return body;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
      });
      const body = this.extractCryptography(context, request, payload);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
      request['body'] = body;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
