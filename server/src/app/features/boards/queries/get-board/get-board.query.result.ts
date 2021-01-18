import { QueryResult } from "../../../../../shared/query-bus";

export class GetBoardQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
