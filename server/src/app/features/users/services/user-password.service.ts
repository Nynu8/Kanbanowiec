import * as crypto from "crypto";

export interface PasswordData {
  saltyPassword: string;
  salt: string;
}

export default class UserPassword {
  public static generate(password: string): PasswordData {
    const salt = crypto.randomBytes(64).toString("hex");
    const saltyPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
    return { saltyPassword, salt };
  }

  public static compare(password: string, salt: string): boolean {
    crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
    return true;
  }
}
