import { CommandHandler } from "../../../../shared/command-bus";
import { DELETE_USER_COMMAND_TYPE, DeleteUserCommand } from "../commands/delete-user.command";
import { Repository } from "typeorm";
import { UserModel } from "../models/user.model";
import { BadRequestError } from "../../../../errors/bad-request.error";

export interface DeleteHandlerDependencies {
  userRepository: Repository<UserModel>;
}

export default class DeleteUserHandler implements CommandHandler<DeleteUserCommand> {
  public commandType: string = DELETE_USER_COMMAND_TYPE;

  constructor(private dependencies: DeleteHandlerDependencies) {}

  async execute({ payload: { id } }: DeleteUserCommand) {
    const { userRepository } = this.dependencies;

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    await userRepository.delete(user!);

    return true;
  }
}
