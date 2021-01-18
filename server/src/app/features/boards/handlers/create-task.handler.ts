import { CommandHandler } from "../../../../shared/command-bus";
import { CREATE_TASK_COMMAND_TYPE, CreateTaskCommand } from "../commands/create-task.command";
import { Repository } from "typeorm";
import { TaskModel } from "../models/task.model";
import { UserModel } from "../../users/models/user.model";
import { PermissionModel } from "../models/permission.model";
import { ColumnModel } from "../models/column.model";
import { UnauthorizedError } from "../../../../errors/unauthorized.error";
import { UserPermission } from "../../../../../shared/enum/user-permission.enum";

export interface CreateTaskHandlerDependencies {
  taskRepository: Repository<TaskModel>;
  userRepository: Repository<UserModel>;
  permissionRepository: Repository<PermissionModel>;
  columnRepository: Repository<ColumnModel>;
}

export default class CreateTaskHandler implements CommandHandler<CreateTaskCommand> {
  public commandType: string = CREATE_TASK_COMMAND_TYPE;

  constructor(private dependencies: CreateTaskHandlerDependencies) {}

  async execute({ payload }: CreateTaskCommand) {
    const { taskRepository, userRepository, permissionRepository, columnRepository } = this.dependencies;
    const { userId, name, description, columnId } = payload;

    const user = await userRepository.findOne({ id: userId });
    const column = await columnRepository.findOne({ where: { id: columnId }, relations: ["board"] });
    const userPermission = await permissionRepository.findOne({ where: { board: column!.board, user } });

    if (!userPermission || userPermission!.type === UserPermission.Viewer) {
      throw new UnauthorizedError();
    }

    const task = TaskModel.create({ column, creator: user, description, name });
    await taskRepository.save(task);
  }
}
