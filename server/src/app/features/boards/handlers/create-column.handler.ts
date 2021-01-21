import { CommandHandler } from "../../../../shared/command-bus";
import { CREATE_COLUMN_COMMAND_TYPE, CreateColumnCommand } from "../commands/create-column.command";
import { Repository } from "typeorm";
import { ColumnModel } from "../models/column.model";
import { BoardModel } from "../models/board.model";
import { BadRequestError } from "../../../../errors/bad-request.error";
import { PermissionModel } from "../models/permission.model";
import { UserModel } from "../../users/models/user.model";
import { UserPermission } from "../../../../../shared/enum/user-permission.enum";
import { UnauthorizedError } from "../../../../errors/unauthorized.error";

export interface CreateColumnHandlerDependencies {
  columnRepository: Repository<ColumnModel>;
  boardRepository: Repository<BoardModel>;
  permissionRepository: Repository<PermissionModel>;
  userRepository: Repository<UserModel>;
}

export default class CreateColumnHandler implements CommandHandler<CreateColumnCommand> {
  public commandType: string = CREATE_COLUMN_COMMAND_TYPE;

  constructor(private dependencies: CreateColumnHandlerDependencies) {}

  async execute({ payload }: CreateColumnCommand) {
    const { boardRepository, columnRepository, permissionRepository, userRepository } = this.dependencies;
    const { boardId, index, name, userId } = payload;

    const [user, board] = await Promise.all([
      userRepository.findOne({ id: userId }),
      boardRepository.findOne({ id: boardId }),
    ]);

    const permission = await permissionRepository.findOne({ where: { board, user } });

    if (!permission || permission.type === UserPermission.User || permission.type === UserPermission.Viewer) {
      throw new UnauthorizedError();
    }

    if (!board) {
      throw new BadRequestError("Board not found");
    }

    const columns = await columnRepository.find({ board });
    for (const column of columns) {
      if (column.index === index) {
        throw new BadRequestError("Column index already used");
      }
    }

    const column = ColumnModel.create({ name, index, board });
    await columnRepository.save(column);
  }
}
