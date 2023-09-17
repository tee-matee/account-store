import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { RSAEncryption } from 'src/core/cryptography';
import { ResponseSchema, IResponse } from 'src/core/response-schema';

@Injectable()
export class SettingService extends ResponseSchema {
  constructor(private configService: ConfigService) {
    super();
  }
  async generateKey(request: Request): Promise<IResponse> {
    const rsa = new RSAEncryption();
    const { privateKey, publicKey } = rsa.generateKey();
    console.log('privateKey', privateKey);
    console.log('publicKey', publicKey);
    const response = { data: { privateKey, publicKey } };
    return this.response(response);
  }

  async serverSetting(request: Request): Promise<IResponse> {
    const key = this.configService.get<string>('KEY');
    const response = { data: { publicKey: btoa(key['SERVER_PUBLIC']) } };
    return this.response(response);
  }
}
