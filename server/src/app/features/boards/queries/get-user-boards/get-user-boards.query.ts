import { Query } from "../../../../../shared/query-bus";

export const GET_USER_BOARDS_QUERY_TYPE = "boards/GET_USER_BOARDS";

export interface GetUserBoardsQueryPayload {
  userId: string;
}

export class GetUserBoardsQuery implements Query<GetUserBoardsQueryPayload> {
  public type: string = GET_USER_BOARDS_QUERY_TYPE;

  constructor(public payload: GetUserBoardsQueryPayload) {}
}
