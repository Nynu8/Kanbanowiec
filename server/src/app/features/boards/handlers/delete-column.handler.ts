import { CommandHandler } from "../../../../shared/command-bus";
import { DELETE_COLUMN_COMMAND_TYPE, DeleteColumnCommand } from "../commands/delete-column.command";
import { Repository } from "typeorm";
import { BoardModel } from "../models/board.model";
import { UserModel } from "../../users/models/user.model";
import { PermissionModel } from "../models/permission.model";
import { TaskModel } from "../models/task.model";
import { UserPermission } from "../../../../../shared/enum/user-permission.enum";
import { UnauthorizedError } from "../../../../errors/unauthorized.error";
import { BadRequestError } from "../../../../errors/bad-request.error";
import { ColumnModel } from "../models/column.model";

export interface DeleteColumnHandlerDependencies {
  boardRepository: Repository<BoardModel>;
  userRepository: Repository<UserModel>;
  permissionRepository: Repository<PermissionModel>;
  taskRepository: Repository<TaskModel>;
  columnRepository: Repository<ColumnModel>;
}

export default class DeleteColumnHandler implements CommandHandler<DeleteColumnCommand> {
  public commandType: string = DELETE_COLUMN_COMMAND_TYPE;

  constructor(private dependencies: DeleteColumnHandlerDependencies) {}

  async execute({ payload }: DeleteColumnCommand) {
    const { userRepository, permissionRepository, columnRepository } = this.dependencies;
    const { userId, columnId } = payload;
    const user = await userRepository.findOne({ id: userId });
    const column = await columnRepository.findOne({ where: { id: columnId }, relations: ["board"] });

    if (!column) throw new BadRequestError("Column not found");

    const permission = await permissionRepository.findOne({ user, board: column!.board });

    if (!permission) throw new UnauthorizedError();

    if (permission!.type == UserPermission.Owner || permission!.type == UserPermission.Administrator) {
      const columns = await columnRepository.find({ board: column!.board });

      for (const col of columns) {
        if (col.index > column.index) {
          col.index = col.index - 1;
        }
      }
      await columnRepository.save(columns);
      await columnRepository.delete(column);
    }
  }
}
