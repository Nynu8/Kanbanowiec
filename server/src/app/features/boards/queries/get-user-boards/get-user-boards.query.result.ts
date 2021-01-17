import { QueryResult } from "../../../../../shared/query-bus";

export class GetUserBoardsQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
