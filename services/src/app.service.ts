import { Injectable } from '@nestjs/common';
// import {
//   generateKeyPairSync,
//   publicDecrypt,
//   publicEncrypt,
//   privateDecrypt,
//   privateEncrypt,
//   createHash,
//   randomBytes,
//   createCipheriv,
//   createDecipheriv,
// } from 'crypto';
// import jsPDF from 'jspdf';
// // import PDFDocument  from "pdfkit"
// import { writeFile, readFile, readFileSync } from 'fs';
import {
  privateDecrypt,
  publicDecrypt,
  publicEncrypt,
  generateKeyPairSync,
  privateEncrypt,
  constants,
} from 'crypto';

@Injectable()
export class AppService {
  getHello(): string {
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
    console.log("publicKey", publicKey)
    console.log("privateKey", privateKey)
    const data = publicEncrypt(
      {
        key: publicKey,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      Buffer.from(JSON.stringify({ email: '1', password: 2 })),
    );
    const client = data.toString('base64');
    console.log('client', client);
    const buf = Buffer.from(client, 'base64');
    console.log('buf', buf);
    const x = privateDecrypt(
      {
        key: privateKey,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      Buffer.from(buf),
    );
    const test = JSON.parse(x.toString());
    console.log('test', test);
    // const doc = new PDFDocument;
    // doc.create
    // var doc = new jsPDF();
    // doc.text('Hello Tee!', 20, 20);
    // alert(1);
    // doc.save('a4.pdf');
    // const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    //   // The standard secure default length for RSA keys is 2048 bits
    //   modulusLength: 2048,
    //   publicKeyEncoding: {
    //     type: 'pkcs1',
    //     format: 'pem',
    //   },

    //   privateKeyEncoding: {
    //     type: 'pkcs1',
    //     format: 'pem',
    //   },
    // });
    // console.log('publicKey', publicKey);
    // console.log('privateKey', privateKey);
    // const buf = Buffer.from('1teelnwza', 'utf8');
    // const secretData = privateEncrypt(privateKey, buf);
    // const origData = publicDecrypt(publicKey, secretData);
    // console.log(origData.toString());

    // const x = publicEncrypt(publicKey, buf);
    // const y = privateDecrypt(privateKey, x);
    // console.log('y', y.toString());

    // const algorithm = 'aes-256-ctr';
    // let key = 'MySuperSecretKey';
    // key = createHash('sha256').update(key).digest('base64').substr(0, 32);
    // const encrypt = (buffer) => {
    //   // Create an initialization vector
    //   const iv = randomBytes(16);
    //   // Create a new cipher using the algorithm, key, and iv
    //   const cipher = createCipheriv(algorithm, key, iv);
    //   // Create the new (encrypted) buffer
    //   const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
    //   return result;
    // };

    // const decrypt = (encrypted) => {
    //   // Get the iv: the first 16 bytes
    //   const iv = encrypted.slice(0, 16);
    //   // Get the rest
    //   encrypted = encrypted.slice(16);
    //   // Create a decipher
    //   const decipher = createDecipheriv(algorithm, key, iv);
    //   // Actually decrypt it
    //   const result = Buffer.concat([
    //     decipher.update(encrypted),
    //     decipher.final(),
    //   ]);
    //   return result;
    // };
    // const plain = Buffer.from('Hello world');

    // const encrypted = encrypt(plain);
    // console.log('Encrypted:', encrypted.toString());
    // async function example() {
    //   try {
    //     await writeFile('account_setting_file', encrypted.toString(), () => {});
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // example();
    // async function testReadFile() {
    //   try {
    //     readFile('account_setting_file', 'utf8', function (err, data) {
    //       const plain = Buffer.from(data);
    //       console.log('data', data);
    //       console.log('plain', plain);
    //       const decrypted = decrypt(plain);
    //       console.log('testReadFile Decrypted:', decrypted.toString());
    //     });
    //     // await writeFile('account_setting_file', encrypted.toString(), () => {});
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // testReadFile();

    // try {
    //   fs.writeFileSync('test.txt', encrypted.toString());
    //   // file written successfully
    // } catch (err) {
    //   console.error(err);
    // }
    // fs.writeFile('test.txt', encrypted.toString(), (err) => {
    //   if (err) {
    //     console.error(err);
    //   }
    //   // file written successfully
    // });
    return 'Hello World!';
  }
}
