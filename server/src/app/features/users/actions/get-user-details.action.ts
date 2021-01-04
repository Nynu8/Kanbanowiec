import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { QueryBus } from "../../../../shared/query-bus";
import { GetUserDetailsQuery } from "../queries/get-user-details";

export interface GetUserDetailsActionDependencies {
  queryBus: QueryBus;
}

export const getUserDetailsActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: Joi.object({
      id: Joi.string().required(),
    }),
  },
  { abortEarly: false },
);

const getUserDetailsAction = ({ queryBus }: GetUserDetailsActionDependencies) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  queryBus
    .execute(
      new GetUserDetailsQuery({
        id: req.body.id,
      }),
    )
    .then((queryResult) => {
      res.json(queryResult.result);
    })
    .catch(next);
};
export default getUserDetailsAction;
