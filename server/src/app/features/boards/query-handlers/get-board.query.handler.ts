import { Repository } from "typeorm";
import { BadRequestError } from "../../../../errors/bad-request.error";
import { UnauthorizedError } from "../../../../errors/unauthorized.error";
import { QueryHandler } from "../../../../shared/query-bus";
import { UserModel } from "../../users/models/user.model";
import { BoardModel } from "../models/board.model";
import { ColumnModel } from "../models/column.model";
import { PermissionModel } from "../models/permission.model";
import { TaskModel } from "../models/task.model";
import { GET_BOARD_QUERY_TYPE, GetBoardQuery, GetBoardQueryResult } from "../queries/get-board";

export interface GetBoardQueryDependencies {
  boardRepository: Repository<BoardModel>;
  userRepository: Repository<UserModel>;
  columnRepository: Repository<ColumnModel>;
  taskRepository: Repository<TaskModel>;
  permissionRepository: Repository<PermissionModel>;
}

export default class GetBoardQueryHandler implements QueryHandler<GetBoardQuery, GetBoardQueryResult> {
  public queryType: string = GET_BOARD_QUERY_TYPE;

  constructor(private dependencies: GetBoardQueryDependencies) {}

  async execute({ payload: { boardId, userId } }: GetBoardQuery): Promise<GetBoardQueryResult> {
    const {
      boardRepository,
      columnRepository,
      taskRepository,
      userRepository,
      permissionRepository,
    } = this.dependencies;

    const [user, board] = await Promise.all([
      userRepository.findOne({ id: userId }),
      boardRepository.findOne({ id: boardId }),
    ]);

    const userPermission = await permissionRepository.findOne({ where: { user, board } });

    if (!board) {
      throw new BadRequestError("Board not found");
    }

    if (!userPermission) {
      throw new UnauthorizedError();
    }

    const [columns, permissions] = await Promise.all([
      columnRepository.find({ where: { board } }),
      permissionRepository.find({ where: { board }, relations: ["user"] }),
    ]);

    const tasks = await Promise.all(
      columns.map((column) => taskRepository.find({ where: { column }, relations: ["creator", "worker", "column"] })),
    );

    return new GetBoardQueryResult({
      board: { ...board },
      columns,
      tasks: tasks.flat().map((task) => {
        const { creator, worker, column, ...restData } = task;
        return { ...restData, creator: creator.username, worker: worker?.username, columnId: column.id };
      }),
      collaborators: permissions.map((permission) => {
        const {
          type,
          user: { username, name, surname },
        } = permission;
        return { username, name, surname, type };
      }),
    });
  }
}
