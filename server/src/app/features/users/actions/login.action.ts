import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { CommandBus } from "../../../../shared/command-bus";
import { LoginCommand } from "../commands/login.command";

export interface LoginActionDependencies {
  commandBus: CommandBus;
}

export const loginActionValidation = celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
  { abortEarly: false },
);

/**
 * @swagger
 *
 * /api/users/login:
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
const loginAction = ({ commandBus }: LoginActionDependencies) => (req: Request, res: Response, next: NextFunction) => {
  commandBus
    .execute(
      new LoginCommand({
        email: req.body.email,
        password: req.body.password,
      }),
    )
    .then((commandResult) => {
      res.json(commandResult);
    })
    .catch(next);
};

export default loginAction;
