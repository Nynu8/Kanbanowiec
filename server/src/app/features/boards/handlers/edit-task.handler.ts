import { Repository } from "typeorm";
import { BadRequestError } from "../../../../errors/bad-request.error";
import { UnauthorizedError } from "../../../../errors/unauthorized.error";
import { UserPermission } from "../../../../../shared/enum/user-permission.enum";
import { CommandHandler } from "../../../../shared/command-bus";
import { UserModel } from "../../users/models/user.model";
import { EDIT_TASK_COMMAND_TYPE, EditTaskCommand } from "../commands/edit-task.command";
import { BoardModel } from "../models/board.model";
import { PermissionModel } from "../models/permission.model";
import { TaskModel } from "../models/task.model";

export interface EditTaskHandlerDependencies {
  permissionRepository: Repository<PermissionModel>;
  userRepository: Repository<UserModel>;
  boardRepository: Repository<BoardModel>;
  taskRepository: Repository<TaskModel>;
}

export default class EditTaskHandler implements CommandHandler<EditTaskCommand> {
  public commandType: string = EDIT_TASK_COMMAND_TYPE;

  constructor(private dependencies: EditTaskHandlerDependencies) {}

  async execute({ payload }: EditTaskCommand) {
    const { userRepository, permissionRepository, boardRepository, taskRepository } = this.dependencies;
    const { userId, name, description, workerId, boardId, taskId } = payload;

    const [user, board] = await Promise.all([
      userRepository.findOne({ id: userId }),
      boardRepository.findOne({ id: boardId }),
    ]);

    const permission = await permissionRepository.findOne({ where: { board, user } });

    if (!permission || permission.type === UserPermission.Viewer) throw new UnauthorizedError();

    const task = await taskRepository.findOne({ id: taskId });
    if (!task) throw new BadRequestError("Task not found");

    task.name = name || task.name;
    task.description = description || task.description;

    if (workerId) {
      const worker = await userRepository.findOne({ id: workerId });
      if (!worker) throw new BadRequestError("Worker not found");

      task.worker = worker;
    }

    await taskRepository.save(task);
  }
}
