import { Controller, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Roles, TypeRoles } from './core/roles.decorator';
import { Cryptography, TypeCryptography } from './core/cryptography.decorator';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('')
@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard)
  @Roles(TypeRoles.user)
  @Cryptography(TypeCryptography.USERTOKEN_PRIVATE_KEY)
  @Get('/test-rate')
  getTestRateRimit(@Body() user: CreateUserDto): string {
    return 'getTestRateRimit';
  }
}
