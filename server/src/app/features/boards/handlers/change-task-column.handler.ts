import { CommandHandler } from "../../../../shared/command-bus";
import { CHANGE_TASK_COLUMN_COMMAND_TYPE, ChangeTaskColumnCommand } from "../commands/change-task-column.command";
import { Repository } from "typeorm";
import { ColumnModel } from "../models/column.model";
import { TaskModel } from "../models/task.model";
import { UserModel } from "../../users/models/user.model";
import { PermissionModel } from "../models/permission.model";
import { UnauthorizedError } from "../../../../errors/unauthorized.error";
import { UserPermission } from "../../../../../shared/enum/user-permission.enum";

export interface ChangeTaskColumnHandlerDependencies {
  columnRepository: Repository<ColumnModel>;
  taskRepository: Repository<TaskModel>;
  userRepository: Repository<UserModel>;
  permissionRepository: Repository<PermissionModel>;
}

export default class ChangeTaskColumnHandler implements CommandHandler<ChangeTaskColumnCommand> {
  public commandType: string = CHANGE_TASK_COLUMN_COMMAND_TYPE;

  constructor(private dependencies: ChangeTaskColumnHandlerDependencies) {}

  async execute({ payload }: ChangeTaskColumnCommand) {
    const { columnRepository, taskRepository, userRepository, permissionRepository } = this.dependencies;
    const { columnId, taskId, userId } = payload;

    const user = await userRepository.findOne({ id: userId });
    const column = await columnRepository.findOne({ where: { id: columnId }, relations: ["board"] });

    const permission = await permissionRepository.findOne({ user, board: column?.board });

    if (!permission) throw new UnauthorizedError();

    if (permission.type !== UserPermission.Viewer) {
      const task = await taskRepository.findOne({ id: taskId });
      if (column != null) task!.column = column;
    }
  }
}
