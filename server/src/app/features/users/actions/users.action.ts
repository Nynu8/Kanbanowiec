import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { QueryBus } from "../../../../shared/query-bus";
import { UsersQuery } from "../queries/users";

export interface UsersActionDependencies {
  queryBus: QueryBus;
}

export const usersActionValidation = celebrate(
  {
    headers: Joi.object(),
  },
  { abortEarly: false },
);

const usersAction = ({ queryBus }: UsersActionDependencies) => (req: Request, res: Response, next: NextFunction) => {
  queryBus
    .execute(new UsersQuery({}))
    .then((queryResult) => {
      res.json(queryResult.result);
    })
    .catch(next);
};

export default usersAction;
