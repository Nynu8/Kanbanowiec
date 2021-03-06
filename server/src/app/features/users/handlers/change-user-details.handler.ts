import { CommandHandler } from "../../../../shared/command-bus";
import { CHANGE_USER_DETAILS_COMMAND_TYPE, ChangeUserDetailsCommand } from "../commands/change-user-details.command";
import { UserModel } from "../models/user.model";
import { Repository } from "typeorm";

export interface ChangeUserDetailsHandlerDependencies {
  userRepository: Repository<UserModel>;
}

export default class ChangeUserDetailsHandler implements CommandHandler<ChangeUserDetailsCommand> {
  public commandType: string = CHANGE_USER_DETAILS_COMMAND_TYPE;

  constructor(private dependencies: ChangeUserDetailsHandlerDependencies) {}

  async execute({ payload }: ChangeUserDetailsCommand) {
    const { userRepository } = this.dependencies;
    const { id } = payload;
    const user = await userRepository.findOne({ id });
    let { name, surname, username } = payload;

    //if user won't change data
    if (name == null) name = user!.name;
    if (surname == null) surname = user!.surname;
    if (username == null) username = user!.username;
    else {
      const tmpUser = await userRepository.findOne({ username });
      if (tmpUser) {
        throw new Error("Username already exists");
      }
    }

    await userRepository.update({ id }, { name, surname, username });
    return { result: { name, surname, username } };
  }
}
