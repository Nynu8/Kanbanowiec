import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { QueryBus } from "../../../../shared/query-bus";
import { GetUserBoardsQuery } from "../queries/get-user-boards";

export interface GetUserBoardsActionDependencies {
  queryBus: QueryBus;
}

export const getUserBoardsActionValidation = celebrate(
  {
    headers: Joi.object(),
  },
  { abortEarly: false },
);

const getUserBoardsAction = ({ queryBus }: GetUserBoardsActionDependencies) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  queryBus
    .execute(
      new GetUserBoardsQuery({
        userId: req.userId,
      }),
    )
    .then((queryResult) => {
      res.json(queryResult.result);
    })
    .catch(next);
};
export default getUserBoardsAction;
