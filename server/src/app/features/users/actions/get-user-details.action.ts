import { Request, Response, NextFunction } from "express";
import { QueryBus } from "../../../../shared/query-bus";
import { GetUserDetailsQuery } from "../queries/get-user-details";

export interface GetUserDetailsActionDependencies {
  queryBus: QueryBus;
}

const getUserDetailsAction = ({ queryBus }: GetUserDetailsActionDependencies) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  queryBus
    .execute(
      new GetUserDetailsQuery({
        id: req.userId,
      }),
    )
    .then((queryResult) => {
      res.json(queryResult.result);
    })
    .catch(next);
};
export default getUserDetailsAction;
