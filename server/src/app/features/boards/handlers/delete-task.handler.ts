import { CommandHandler } from "../../../../shared/command-bus";
import { DELETE_TASK_COMMAND_TYPE, DeleteTaskCommand } from "../commands/delete-task.command";
import { Repository } from "typeorm";
import { BoardModel } from "../models/board.model";
import { UserModel } from "../../users/models/user.model";
import { PermissionModel } from "../models/permission.model";
import { TaskModel } from "../models/task.model";
import { UserPermission } from "../../../../../shared/enum/user-permission.enum";
import { UnauthorizedError } from "../../../../errors/unauthorized.error";
import { BadRequestError } from "../../../../errors/bad-request.error";

export interface DeleteTaskHandlerDependencies {
  boardRepository: Repository<BoardModel>;
  userRepository: Repository<UserModel>;
  permissionRepository: Repository<PermissionModel>;
  taskRepository: Repository<TaskModel>;
}

export default class DeleteTaskHandler implements CommandHandler<DeleteTaskCommand> {
  public commandType: string = DELETE_TASK_COMMAND_TYPE;

  constructor(private dependencies: DeleteTaskHandlerDependencies) {}

  async execute({ payload }: DeleteTaskCommand) {
    const { boardRepository, userRepository, permissionRepository, taskRepository } = this.dependencies;
    const { boardId, taskId, userId } = payload;

    const [user, board, task] = await Promise.all([
      userRepository.findOne({ id: userId }),
      boardRepository.findOne({ id: boardId }),
      taskRepository.findOne({ id: taskId }),
    ]);

    const permission = await permissionRepository.findOne({ where: { board, user } });

    if (!permission || permission.type === UserPermission.Viewer) {
      throw new UnauthorizedError();
    }

    if (!task) {
      throw new BadRequestError("Task not found");
    }

    await taskRepository.delete(task!);
  }
}
