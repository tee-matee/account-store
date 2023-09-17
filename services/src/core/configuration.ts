import { readFileSync } from 'fs';
import * as path from 'path';
import { parse } from 'dotenv';

interface IDatabase {
  HOST: string;
  PORT: number;
}

interface IKey {
  SERVER_PRIVATE: string;
  SERVER_PUBLIC: string;
  JWT_SECRET: string;
}

interface IResponse {
  SERVICE_PORT: number;
  DATABASE: IDatabase;
  KEY: IKey;
}

export default (): IResponse => {
  let filePath = '';
  switch (process.env.STAGE) {
    case 'DEV':
      filePath = path.join(__dirname, '../../src/env/.develop.env');
      break;
    case 'UAT':
      filePath = path.join(__dirname, '../../src/env/.uat.env');
      break;
    default:
      filePath = '';
  }
  if (filePath === '') throw new Error('missing filePath!');
  const environment = parse(readFileSync(filePath, 'utf8'));
  // console.log('environment', environment);
  return {
    SERVICE_PORT: parseInt(environment['SERVICE_PORT'], 10),
    DATABASE: {
      HOST: process.env.DATABASE_HOST,
      PORT: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    },
    KEY: {
      SERVER_PRIVATE: environment['SERVER_PRIVATE_KEY'],
      SERVER_PUBLIC: environment['SERVER_PUBLIC_KEY'],
      JWT_SECRET: environment['JWT_SECRET_KEY'],
    },
  };
};
