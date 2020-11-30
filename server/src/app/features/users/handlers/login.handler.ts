import { CommandHandler } from "../../../../shared/command-bus";
import { LOGIN_COMMAND_TYPE, LoginCommand } from "../commands/login.command";
import UserPassword from "../services/user-password.service";
import { IsNull, Repository } from "typeorm";
import { UserModel } from "../models/user.model";
import { TokenModel } from "../models/token.model";
import AccessTokenService from "../services/access-token.service";
import { v4 as uuid } from "uuid";

export interface LoginHandlerDependencies {
  userRepository: Repository<UserModel>;
  accessTokenService: AccessTokenService;
  tokenRepository: Repository<TokenModel>;
}

export default class LoginHandler implements CommandHandler<LoginCommand> {
  public commandType: string = LOGIN_COMMAND_TYPE;

  constructor(private dependencies: LoginHandlerDependencies) {}

  async execute({ payload }: LoginCommand) {
    const { userRepository, tokenRepository, accessTokenService } = this.dependencies;
    const { username, password } = payload;
    const user = await userRepository.findOne({ username });

    if (!user || !UserPassword.compare(password, user.salt, user.password)) {
      throw new Error("Invalid credentials");
    }

    const { id: userId } = user;
    const refreshToken = accessTokenService.generateRefreshToken(userId);
    const accessToken = accessTokenService.generateAccessToken(userId);

    const newToken = TokenModel.create({ id: uuid(), userId, token: refreshToken });
    await tokenRepository.save(newToken);

    return {
      result: { refreshToken, accessToken },
    };
  }
}
