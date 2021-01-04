import { QueryResult } from "../../../../../shared/query-bus";

export class GetUserDetailsQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
