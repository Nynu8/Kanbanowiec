import { CommandHandler } from "../../../../shared/command-bus";
import { ADD_USER_COMMAND_TYPE, AddUserCommand } from "../commands/add-user.command";
import { Repository } from "typeorm";
import { UserModel } from "../../users/models/user.model";
import { BoardModel } from "../models/board.model";
import { PermissionModel } from "../models/permission.model";
import { UnauthorizedError } from "../../../../errors/unauthorized.error";
import { BadRequestError } from "../../../../errors/bad-request.error";
import { UserPermission } from "../../../../../shared/enum/user-permission.enum";

export interface AddUserHandlerDependencies {
  userRepository: Repository<UserModel>;
  boardRepository: Repository<BoardModel>;
  permissionRepository: Repository<PermissionModel>;
}

export default class AddUserHandler implements CommandHandler<AddUserCommand> {
  public commandType: string = ADD_USER_COMMAND_TYPE;

  constructor(private dependencies: AddUserHandlerDependencies) {}

  async execute({ payload }: AddUserCommand) {
    const { boardRepository, userRepository, permissionRepository } = this.dependencies;
    const { userId, boardId, userName, permission } = payload;

    const board = await boardRepository.findOne({ id: boardId });
    const user = await userRepository.findOne({ id: userId });
    //  v check if user has permission to add another user to board v
    const userPermission = await permissionRepository.findOne({ user, board });

    if (!userPermission) throw new UnauthorizedError();

    if (userPermission!.type == UserPermission.Owner || userPermission!.type == UserPermission.Administrator) {
      const newUser = await userRepository.findOne({ username: userName });
      if (!newUser) throw new BadRequestError("User not found");

      //  v updating existing permission  v
      const existingPermission = await permissionRepository.findOne({ user: newUser, board });
      if (!existingPermission) {
        const newPermission = PermissionModel.create({ type: permission, user: newUser, board });
        await permissionRepository.save(newPermission);
      } else {
        existingPermission!.type = permission;
        await permissionRepository.save(existingPermission!);
      }
    }

    return {
      result: board,
    };
  }
}
