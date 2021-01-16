import { CommandHandler } from "../../../../shared/command-bus";
import { EDIT_BOARD_COMMAND_TYPE, EditBoardCommand } from "../commands/edit-board.command";
import { Repository } from "typeorm";
import { UserModel } from "../../users/models/user.model";
import { BoardModel } from "../models/board.model";
import { PermissionModel } from "../models/permission.model";
import { UserPermission } from "../../../../../../shared/enum/user-permission.enum";
import { UnauthorizedError } from "../../../../errors/unauthorized.error";

export interface EditBoardHandlerDependencies {
  userRepository: Repository<UserModel>;
  boardRepository: Repository<BoardModel>;
  permissionRepository: Repository<PermissionModel>;
}

export default class EditBoardHandler implements CommandHandler<EditBoardCommand> {
  public commandType: string = EDIT_BOARD_COMMAND_TYPE;

  constructor(private dependencies: EditBoardHandlerDependencies) {}

  async execute({ payload }: EditBoardCommand) {
    const { boardRepository, userRepository, permissionRepository } = this.dependencies;
    const { userId, boardId, newName } = payload;

    const board = await boardRepository.findOne({ id: boardId });
    const user = await userRepository.findOne({ id: userId });
    const permission = await permissionRepository.findOne({ user, board });

    if (!permission) throw new UnauthorizedError();

    if (permission!.type == UserPermission.Owner || permission!.type == UserPermission.Administrator) {
      if (newName != null) board!.name = newName;
      boardRepository.save(board!);
    }
  }
}
