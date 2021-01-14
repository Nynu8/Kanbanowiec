import { CommandHandler } from "../../../../shared/command-bus";
import { CREATE_BOARD_COMMAND_TYPE, CreateBoardCommand } from "../commands/create-board.command";
import { Repository } from "typeorm";
import { UserModel } from "../../users/models/user.model";
import { BoardModel } from "../models/board.model";
import { v4 as uuid } from "uuid";
import { PermissionModel } from "../models/permission.model";
import { UserPermission } from "../models/UserPermission.enum";

export interface CreateBoardHandlerDependencies {
  userRepository: Repository<UserModel>;
  boardRepository: Repository<BoardModel>;
  permissionRepository: Repository<PermissionModel>;
}

export default class CreateBoardHandler implements CommandHandler<CreateBoardCommand> {
  public commandType: string = CREATE_BOARD_COMMAND_TYPE;

  constructor(private dependencies: CreateBoardHandlerDependencies) {}

  async execute({ payload }: CreateBoardCommand) {
    const { boardRepository, userRepository, permissionRepository } = this.dependencies;
    const { id, name } = payload;
    const user = await userRepository.findOne({ id });

    const board = await boardRepository.findOne({ name });
    if (board) {
      throw new Error("Board already exists");
    }

    const newBoard = BoardModel.create({ id: uuid(), name });
    await boardRepository.save(newBoard);

    const permission = PermissionModel.create({
      id: uuid(),
      type: UserPermission.Owner,
      user,
      board: newBoard,
    });
    await permissionRepository.save(permission);
  }
}
