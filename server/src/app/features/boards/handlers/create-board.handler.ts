import { v4 as uuid } from "uuid";
import { Repository } from "typeorm";
import { CommandHandler } from "../../../../shared/command-bus";
import { CREATE_BOARD_COMMAND_TYPE, CreateBoardCommand } from "../commands/create-board.command";
import { UserModel } from "../../users/models/user.model";
import { BoardModel } from "../models/board.model";
import { PermissionModel } from "../models/permission.model";
import { ColumnModel } from "../models/column.model";
import { UserPermission } from "../../../../../shared/enum/user-permission.enum";

export interface CreateBoardHandlerDependencies {
  userRepository: Repository<UserModel>;
  boardRepository: Repository<BoardModel>;
  permissionRepository: Repository<PermissionModel>;
  columnRepository: Repository<ColumnModel>;
}

export default class CreateBoardHandler implements CommandHandler<CreateBoardCommand> {
  public commandType: string = CREATE_BOARD_COMMAND_TYPE;

  constructor(private dependencies: CreateBoardHandlerDependencies) {}

  async execute({ payload }: CreateBoardCommand) {
    const { boardRepository, userRepository, permissionRepository, columnRepository } = this.dependencies;
    const { id, name } = payload;
    const user = await userRepository.findOne({ id });

    const newBoard = BoardModel.create({ id: uuid(), name });
    await boardRepository.save(newBoard);

    const permission = PermissionModel.create({
      id: uuid(),
      type: UserPermission.Owner,
      user,
      board: newBoard,
    });
    await permissionRepository.save(permission);

    const columns = [
      ColumnModel.create({ id: uuid(), index: 0, name: "To do", board: newBoard }),
      ColumnModel.create({ id: uuid(), index: 1, name: "Done", board: newBoard }),
    ];
    await columnRepository.save(columns);

    return { result: newBoard };
  }
}
