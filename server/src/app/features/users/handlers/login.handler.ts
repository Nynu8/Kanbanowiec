import { CommandHandler } from "../../../../shared/command-bus";
import { LOGIN_COMMAND_TYPE, LoginCommand } from "../commands/login.command";
import { EventDispatcher } from "../../../../shared/event-dispatcher";
import LoginEvent from "../events/login.event";
import UserPassword from "../services/user-password.service";
import { IsNull, Repository } from "typeorm";
import { UserModel } from "../models/user.model";
import { TokenModel } from "../models/token.model";
import AccessToken from "../services/access-token.service";
import AccessTokenService from "../services/access-token.service";

export interface LoginHandlerDependencies {
  userRepository: Repository<UserModel>;
  accessTokenService: AccessTokenService;
}

export default class LoginHandler implements CommandHandler<LoginCommand> {
  public commandType: string = LOGIN_COMMAND_TYPE;

  constructor(private dependencies: LoginHandlerDependencies) {}

  async execute({ payload }: LoginCommand) {
    const { userRepository } = this.dependencies;
    const { username, password } = payload;
    const user = await userRepository.findOne({ username });

    if (!user || !UserPassword.compare(password, user.salt, user.password)) {
      throw new Error("Invalid credentials");
    }

    const refreshToken = this.dependencies.accessTokenService.generateRefreshToken(username);
    const accessToken = this.dependencies.accessTokenService.generateAccessToken(username);

    return {
      result: true,
      tokens: { refreshToken, accessToken },
    };
  }
}
