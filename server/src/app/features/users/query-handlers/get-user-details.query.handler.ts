import { QueryHandler } from "../../../../shared/query-bus";
import {
  GET_USER_DETAILS_QUERY_TYPE,
  GetUserDetailsQuery,
  GetUserDetailsQueryResult,
} from "../queries/get-user-details";
import { UserModel } from "../models/user.model";
import { Repository } from "typeorm";

export interface GetUserDetailsQueryHandlerDependencies {
  userRepository: Repository<UserModel>;
}

export default class GetUserDetailsQueryHandler
  implements QueryHandler<GetUserDetailsQuery, GetUserDetailsQueryResult> {
  public queryType: string = GET_USER_DETAILS_QUERY_TYPE;

  constructor(private dependencies: GetUserDetailsQueryHandlerDependencies) {}

  async execute(query: GetUserDetailsQuery): Promise<GetUserDetailsQueryResult> {
    const { userRepository } = this.dependencies;
    const { id } = query.payload;
    const user = await userRepository.findOne({ id });

    if (user) {
      const { username, name, surname } = user;
      return new GetUserDetailsQueryResult({ username, name, surname });
    }

    throw new Error("User does not exist");
  }
}
