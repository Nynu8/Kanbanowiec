import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { QueryBus } from "../../../../shared/query-bus";
import { GetBoardQuery } from "../queries/get-board";

export interface GetBoardActionDependencies {
  queryBus: QueryBus;
}

export const getBoardActionValidation = celebrate(
  {
    headers: Joi.object(),
    query: Joi.object({
      boardId: Joi.string().uuid().required(),
    }),
  },
  { abortEarly: false },
);

const getBoardAction = ({ queryBus }: GetBoardActionDependencies) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  queryBus
    .execute(
      new GetBoardQuery({
        boardId: req.query.boardId as string,
        userId: req.userId,
      }),
    )
    .then((queryResult) => {
      res.json(queryResult.result);
    })
    .catch(next);
};
export default getBoardAction;
