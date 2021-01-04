import { Query } from "../../../../../shared/query-bus";

export const GET_USER_DETAILS_QUERY_TYPE = "users/GET_USER_DETAILS";

export interface GetUserDetailsQueryPayload {
  id: string;
}

export class GetUserDetailsQuery implements Query<GetUserDetailsQueryPayload> {
  public type: string = GET_USER_DETAILS_QUERY_TYPE;

  constructor(public payload: GetUserDetailsQueryPayload) {}
}
