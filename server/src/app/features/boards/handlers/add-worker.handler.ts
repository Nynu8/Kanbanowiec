import { CommandHandler } from "../../../../shared/command-bus";
import { ADD_WORKER_COMMAND_TYPE, AddWorkerCommand } from "../commands/add-worker.command";
import { Repository } from "typeorm";
import { TaskModel } from "../models/task.model";
import { UserModel } from "../../users/models/user.model";
import { PermissionModel } from "../models/permission.model";
import { ColumnModel } from "../models/column.model";
import { UserPermission } from "../../../../../shared/enum/user-permission.enum";
import { UnauthorizedError } from "../../../../errors/unauthorized.error";
import { BadRequestError } from "../../../../errors/bad-request.error";
import { BoardModel } from "../models/board.model";

export interface AddWorkerHandlerDependencies {
  taskRepository: Repository<TaskModel>;
  userRepository: Repository<UserModel>;
  permissionRepository: Repository<PermissionModel>;
  boardRepository: Repository<BoardModel>;
}

export default class AddWorkerHandler implements CommandHandler<AddWorkerCommand> {
  public commandType: string = ADD_WORKER_COMMAND_TYPE;

  constructor(private dependencies: AddWorkerHandlerDependencies) {}

  async execute({ payload }: AddWorkerCommand) {
    const { taskRepository, userRepository, permissionRepository, boardRepository } = this.dependencies;
    const { taskId, userId, workerId, boardId } = payload;

    const user = await userRepository.findOne({ id: userId });
    const board = await boardRepository.findOne({ id: boardId });
    const permission = await permissionRepository.findOne({ where: { board, user } });

    if (!permission || permission.type === UserPermission.Viewer) {
      throw new UnauthorizedError();
    }

    const worker = await userRepository.findOne({ id: workerId });
    if (!worker) {
      throw new BadRequestError("Worker not found");
    }

    const task = await taskRepository.findOne({ id: taskId });

    task!.setWorker(worker);
    await taskRepository.save(task!);
  }
}
