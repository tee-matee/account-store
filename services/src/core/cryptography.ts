import { generateKeyPairSync } from 'crypto';

interface IKey {
  publicKey: string;
  privateKey: string;
}

export class RSAEncryption {
  constructor() {}

  generateKey(): IKey {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
      // The standard secure default length for RSA keys is 2048 bits
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },

      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
    });
    return { publicKey, privateKey };
  }
}
