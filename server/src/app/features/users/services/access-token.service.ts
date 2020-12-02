import * as jwt from "jsonwebtoken";

export interface AccessTokenDependencies {
  secret: string;
  accessTokenLifetime: string;
  refreshTokenLifetime: string;
}

export interface TokenPayload {
  userId: string;
  iat: number;
  exp: number;
}

export default class AccessTokenService {
  private secret: string;

  private accessTokenLifetime: string;

  private refreshTokenLifetime: string;

  constructor(dependencies: AccessTokenDependencies) {
    this.secret = dependencies.secret;
    this.accessTokenLifetime = dependencies.accessTokenLifetime;
    this.refreshTokenLifetime = dependencies.refreshTokenLifetime;
  }

  public verifyToken(token: string) {
    return jwt.verify(token, this.secret) as TokenPayload;
  }

  public generateAccessToken(userId: string) {
    return jwt.sign({ userId }, this.secret, { expiresIn: this.accessTokenLifetime });
  }

  public generateRefreshToken(userId: string) {
    return jwt.sign({ userId }, this.secret, { expiresIn: this.refreshTokenLifetime });
  }
}
