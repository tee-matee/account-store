import { Controller, Get, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IResponse } from 'src/core/response-schema';
import { SettingService } from './setting.service';

@ApiTags('setting')
@Controller('setting')
export class SettingController {
  constructor(private settingService: SettingService) {}

  @HttpCode(HttpStatus.OK)
  @Get('generate-key')
  generateKey(@Request() req): Promise<IResponse> {
    return this.settingService.generateKey(req);
  }

  @HttpCode(HttpStatus.OK)
  @Get('server')
  serverSetting(@Request() req): Promise<IResponse> {
    return this.settingService.serverSetting(req);
  }
}
