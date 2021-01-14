import { CommandHandler } from "../../../../shared/command-bus";
import { DELETE_COMMAND_TYPE, DeleteCommand } from "../commands/delete.command";
import { Repository } from "typeorm";
import { UserModel } from "../models/user.model";
import { BadRequestError } from "../../../../errors/bad-request.error";

export interface DeleteHandlerDependencies {
  userRepository: Repository<UserModel>;
}

export default class DeleteHandler implements CommandHandler<DeleteCommand> {
  public commandType: string = DELETE_COMMAND_TYPE;

  constructor(private dependencies: DeleteHandlerDependencies) {}

  async execute({ payload: { id } }: DeleteCommand) {
    const { userRepository } = this.dependencies;

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    await userRepository.delete(user!);

    return true;
  }
}
