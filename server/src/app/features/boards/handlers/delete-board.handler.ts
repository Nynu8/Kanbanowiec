import { CommandHandler } from "../../../../shared/command-bus";
import { DELETE_BOARD_COMMAND_TYPE, DeleteBoardCommand } from "../commands/delete-board.command";
import { BoardModel } from "../models/board.model";
import { Repository } from "typeorm";
import { UserModel } from "../../users/models/user.model";
import { PermissionModel } from "../models/permission.model";
import { UnauthorizedError } from "../../../../errors/unauthorized.error";
import { UserPermission } from "../models/user-permission.enum";

export interface DeleteBoardHandlerDependencies {
  boardRepository: Repository<BoardModel>;
  userRepository: Repository<UserModel>;
  permissionRepository: Repository<PermissionModel>;
}

export default class DeleteBoardHandler implements CommandHandler<DeleteBoardCommand> {
  public commandType: string = DELETE_BOARD_COMMAND_TYPE;

  constructor(private dependencies: DeleteBoardHandlerDependencies) {}

  async execute({ payload }: DeleteBoardCommand) {
    const { userRepository, boardRepository, permissionRepository } = this.dependencies;
    const { userId, boardId } = payload;

    const user = await userRepository.findOne({ id: userId });
    const board = await boardRepository.findOne({ id: boardId });
    const permission = await permissionRepository.findOne({ user, board });

    console.log("\n\n\n\n\n\n\n\n\n", boardId);

    if (!permission) throw new UnauthorizedError();

    if (permission!.type == UserPermission.Owner || permission!.type == UserPermission.Administrator)
      await boardRepository.delete(board!);
  }
}
