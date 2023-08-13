import { SetMetadata } from '@nestjs/common';

export enum TypeCryptography {
  SERVER_PRIVATE_KEY,
  USERTOKEN_PRIVATE_KEY,
}

export const CRYPTOGRAPHY_KEY = 'cryptography';
export const Cryptography = (...cryptography: TypeCryptography[]) =>
  SetMetadata(CRYPTOGRAPHY_KEY, cryptography);
