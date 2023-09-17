import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import {
  privateDecrypt,
  constants,
} from 'crypto';

@Injectable()
export class CryptographyMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const key = this.configService.get<string>('KEY');
    const body = req['body'];
    const data = body['data'];
    const buf = Buffer.from(data, 'base64');
    if (data === undefined) throw new BadRequestException();
    let bundleBody = {};
    try {
      const x = privateDecrypt(
        {
          key: key['SERVER_PRIVATE_KEY'],
          padding: constants.RSA_PKCS1_PADDING,
          oaepHash: 'sha256',
        },
        buf,
      );
      var temp = x.toString();
      console.log('temp', temp);
      bundleBody = JSON.parse(temp);
    } catch (err) {
      console.log('err', err);
    }
    console.log('bundleBody', bundleBody);
    req['body'] = bundleBody;
    next();
  }
}
