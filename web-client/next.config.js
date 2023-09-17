/** @type {import('next').NextConfig} */
const fs = require("fs")
const path = require("path")
const dotenv = require("dotenv")
dotenv.config()

let filePath = '';
  switch (process.env.STAGE) {
    case 'DEV':
      filePath = path.join(__dirname, 'env/.develop.env');
      break;
    case 'UAT':
      filePath = path.join(__dirname, 'env/.uat.env');
      break;
    default:
      filePath = '';
}
if (filePath === '') throw new Error('missing filePath!');
const environment = dotenv.parse(fs.readFileSync(filePath, 'utf8'));

const nextConfig = {
  reactStrictMode: false,
  presets: ["next/babel"],
  env: {
    HOST_SERVICE: environment["HOST_SERVICE"],
    AES_SECRET_KEY: environment["AES_SECRET_KEY"],
    AES_SECRET_IV: environment["AES_SECRET_IV"],
    AES_ECNRYPTION_METHOD: environment["AES_ECNRYPTION_METHOD"],
    SERVER_PUBLIC_KEY: environment["SERVER_PUBLIC_KEY"],
  },
}

module.exports = nextConfig
