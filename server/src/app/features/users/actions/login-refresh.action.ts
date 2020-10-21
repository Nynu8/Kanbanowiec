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

/**
 * @swagger
 *
 * /api/users/login-refresh:
 *   post:
 *     description: desc
 *     responses:
 *       201:
 *         description: desc
 *       400:
 *         description: Validation Error
 *       500:
 *         description: Internal Server Error
 */
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
