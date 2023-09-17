import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import configuration from 'src/core/configuration';
import { CryptographyMiddleware } from 'src/middleware/cryptography.middleware';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

const key = configuration.call('')['KEY'];

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: key['JWT_SECRET'],
    }),
  ],
  providers: [AuthService, ConfigService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CryptographyMiddleware)
      .exclude(
        { path: 'register', method: RequestMethod.POST },
        { path: 'login', method: RequestMethod.POST },
      )
      .forRoutes(AuthController);
  }
}
