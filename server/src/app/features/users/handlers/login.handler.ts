import { CommandHandler } from "../../../../shared/command-bus";
import { LOGIN_COMMAND_TYPE, LoginCommand } from "../commands/login.command";
import { EventDispatcher } from "../../../../shared/event-dispatcher";
import LoginEvent from "../events/login.event";
import UserPassword from "../services/user-password.service";
import { IsNull, Repository } from "typeorm";
import { UserModel } from "../models/user.model";

export interface LoginHandlerDependencies {
  userRepository: Repository<UserModel>;
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

    //await this.dependencies.eventDispatcher.dispatch(new LoginEvent(command))

    return {
      result: true,
    };
  }
}
