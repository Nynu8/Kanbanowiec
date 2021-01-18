import { Query } from "../../../../../shared/query-bus";

export const GET_BOARD_QUERY_TYPE = "boards/GET_BOARD";

export interface GetBoardQueryPayload {
  boardId: string;
  userId: string;
}

export class GetBoardQuery implements Query<GetBoardQueryPayload> {
  public type: string = GET_BOARD_QUERY_TYPE;

  constructor(public payload: GetBoardQueryPayload) {}
}
