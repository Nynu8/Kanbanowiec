import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { CommandBus } from "../../../../shared/command-bus";
import { LoginCommand } from "../commands/login.command";

export interface LoginActionDependencies {
  commandBus: CommandBus;
}

export const loginActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: Joi.object({
      username: Joi.string().min(4).required(),
      password: Joi.string().min(8).required(),
    }),
  },
  { abortEarly: false },
);

const loginAction = ({ commandBus }: LoginActionDependencies) => (req: Request, res: Response, next: NextFunction) => {
  commandBus
    .execute(
      new LoginCommand({
        username: req.body.username,
        password: req.body.password,
      }),
    )
    .then((commandResult) => {
      res.json(commandResult.result);
    })
    .catch(next);
};
export default loginAction;
