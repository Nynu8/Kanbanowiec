import { QueryHandler } from "../../../../shared/query-bus";
import { USERS_QUERY_TYPE, UsersQuery, UsersQueryResult } from "../queries/users";

export default class UsersQueryHandler implements QueryHandler<UsersQuery, UsersQueryResult> {
  public queryType: string = USERS_QUERY_TYPE;

  async execute(_query: UsersQuery): Promise<UsersQueryResult> {
    return new UsersQueryResult("temp");
  }
}
