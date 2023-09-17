import { createCipheriv, createDecipheriv, createHash } from "crypto";

export enum TypeSecuringLocalStorage {
  Get,
  Set,
}

export enum KeySecuringLocalStorage {
  Token = "Token",
  UserPublicKey = "UserPublicKey",
  ServerPublicKey = "ServerPublicKey",
}

const key = createHash("sha512")
  .update(process.env.AES_SECRET_KEY)
  .digest("hex")
  .substring(0, 32);

const encryptionIV = createHash("sha512")
  .update(process.env.AES_SECRET_IV)
  .digest("hex")
  .substring(0, 16);

function encryptData(data: string) {
  const cipher = createCipheriv(
    process.env.AES_ECNRYPTION_METHOD,
    key,
    encryptionIV
  );
  return Buffer.from(
    cipher.update(data, "utf8", "hex") + cipher.final("hex")
  ).toString("base64"); // Encrypts data and converts to hex and base64
}

function decryptData(encryptedData: string) {
  const buff = Buffer.from(encryptedData, "base64");
  const decipher = createDecipheriv(
    process.env.AES_ECNRYPTION_METHOD,
    key,
    encryptionIV
  );
  return (
    decipher.update(buff.toString("utf8"), "hex", "utf8") +
    decipher.final("utf8")
  ); // Decrypts data and converts to utf8
}

export const securingLocalStorage = (
  type: TypeSecuringLocalStorage,
  key: KeySecuringLocalStorage,
  value: string
): string => {
  let result = "";
  if (type === TypeSecuringLocalStorage.Set) {
    localStorage.setItem(key, encryptData(value));
  } else {
    result = decryptData(localStorage.getItem(key) || "");
  }
  return result;
};
