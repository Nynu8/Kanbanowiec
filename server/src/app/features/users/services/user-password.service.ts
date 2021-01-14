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

  /**
   * Return true if password is the same like userPassword from database
   */
  public static compare(password: string, salt: string, userPassword: string): boolean {
    const tmpPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
    return tmpPassword === userPassword;
  }
}
