import { Request, Response, NextFunction } from "express";
import { UNAUTHORIZED } from "http-status-codes";
import AccessTokenService from "../app/features/users/services/access-token.service";

export const isLoggedIn = ({ accessTokenService }: { accessTokenService: AccessTokenService }) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const [, userAccessToken] = String(req.headers.authorization).split(" ");
  try {
    const { userId } = accessTokenService.verifyToken(userAccessToken);
    Object.assign(req, { userId });
    return next();
  } catch (e) {
    return res.status(UNAUTHORIZED).json();
  }
};
