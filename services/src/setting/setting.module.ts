import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';

@Module({
  controllers: [SettingController],
  providers: [SettingService, ConfigService],
})
export class SettingModule {}
