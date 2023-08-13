import { readFileSync } from 'fs';
import * as path from 'path';
import { parse } from 'dotenv';

interface IDatabase {
  HOST: string;
  PORT: number;
}

interface IResponse {
  SERVICE_PORT: number;
  JWT_SECRET_KEY: string;
  DATABASE: IDatabase;
}

export default (): IResponse => {
  let filePath = '';
  switch (process.env.STAGE) {
    case 'DEV':
      filePath = path.join(__dirname, '../../src/env/.develop.env');
      break;
    default:
      filePath = '';
  }
  if (filePath === '') throw new Error('missing filePath!');
  const environment = parse(readFileSync(filePath, 'utf8'));
  // console.log('environment', environment);
  return {
    SERVICE_PORT: parseInt(environment['SERVICE_PORT'], 10),
    JWT_SECRET_KEY: environment['JWT_SECRET_KEY'],
    DATABASE: {
      HOST: process.env.DATABASE_HOST,
      PORT: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    },
  };
};
