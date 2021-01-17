import { UnauthorizedError } from "../../../../errors/unauthorized.error";
import { Repository } from "typeorm";
import { QueryHandler } from "../../../../shared/query-bus";
import { UserModel } from "../../users/models/user.model";
import { PermissionModel } from "../models/permission.model";
import { GET_USER_BOARDS_QUERY_TYPE, GetUserBoardsQuery, GetUserBoardsQueryResult } from "../queries/get-user-boards";

export interface GetUserboardsQueryHandlerDependencies {
  permissionRepository: Repository<PermissionModel>;
  userRepository: Repository<UserModel>;
}

export default class GetUserBoardsQueryHandler implements QueryHandler<GetUserBoardsQuery, GetUserBoardsQueryResult> {
  public queryType: string = GET_USER_BOARDS_QUERY_TYPE;

  constructor(private dependencies: GetUserboardsQueryHandlerDependencies) {}

  async execute({ payload: { userId } }: GetUserBoardsQuery): Promise<GetUserBoardsQueryResult> {
    const { permissionRepository, userRepository } = this.dependencies;

    console.log("\n\n\n\n\n\n\n\n\n\n", userId);
    const user = await userRepository.findOne({ id: userId });
    if (!user) {
      throw new UnauthorizedError();
    }

    const userBoards = await permissionRepository.find({ where: { user }, relations: ["board"] });
    return new GetUserBoardsQueryResult(userBoards.map((board) => ({ name: board.board.name, id: board.board.id })));
  }
}
