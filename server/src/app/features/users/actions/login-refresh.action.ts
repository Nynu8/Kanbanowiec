import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { CommandBus } from "../../../../shared/command-bus";
import { LoginRefreshCommand } from "../commands/login-refresh.command";

export interface LoginRefreshActionDependencies {
  commandBus: CommandBus;
}

export const loginRefreshActionValidation = celebrate(
  {
    body: Joi.object({
      refreshToken: Joi.string().required(),
    }),
  },
  { abortEarly: false },
);

const loginRefreshAction = ({ commandBus }: LoginRefreshActionDependencies) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  commandBus
    .execute(
      new LoginRefreshCommand({
        refreshToken: req.body.refreshToken,
      }),
    )
    .then((commandResult) => {
      res.json(commandResult);
    })
    .catch(next);
};
export default loginRefreshAction;
