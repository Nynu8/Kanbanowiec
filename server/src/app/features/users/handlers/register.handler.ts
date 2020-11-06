import { Repository } from "typeorm";
import { CommandHandler } from "../../../../shared/command-bus";
import { REGISTER_COMMAND_TYPE, RegisterCommand } from "../commands/register.command";
import { UserModel } from "../models/user.model";
import { v4 as uuid } from "uuid";

export interface RegisterHandlerDependencies {
  userRepository: Repository<UserModel>;
}

export default class RegisterHandler implements CommandHandler<RegisterCommand> {
  public commandType: string = REGISTER_COMMAND_TYPE;

  constructor(private dependencies: RegisterHandlerDependencies) {}

  async execute({ payload }: RegisterCommand) {
    const { userRepository } = this.dependencies;
    const { username, password, name, surname } = payload;

    const user = await userRepository.findOne({ username });
    if (user) {
      throw new Error("User already exists");
    }

    const newUser = UserModel.create({ id: uuid(), username, name, surname });
    newUser.setPassword(password);

    await userRepository.save(newUser);
  }
}
