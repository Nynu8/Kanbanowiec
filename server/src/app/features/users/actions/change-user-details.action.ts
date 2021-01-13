import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { CommandBus } from "../../../../shared/command-bus";
import { ChangeUserDetailsCommand } from "../commands/change-user-details.command";

export interface ChangeUserDetailsActionDependencies {
  commandBus: CommandBus;
}

export const changeUserDetailsActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: Joi.object({
      username: Joi.string().min(4),
      name: Joi.string().min(3),
      surname: Joi.string().min(3),
    }),
  },
  { abortEarly: false },
);

const changeUserDetailsAction = ({ commandBus }: ChangeUserDetailsActionDependencies) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  commandBus
    .execute(
      new ChangeUserDetailsCommand({
        id: req.userId,
        username: req.body.username,
        name: req.body.name,
        surname: req.body.surname,
      }),
    )
    .then((commandResult) => {
      res.json(commandResult.result);
    })
    .catch(next);
};
export default changeUserDetailsAction;
