import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { CommandBus } from "../../../../shared/command-bus";
import { RegisterCommand } from "../commands/register.command";

export interface RegisterActionDependencies {
  commandBus: CommandBus;
}

export const registerActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    }),
  },
  { abortEarly: false },
);

const registerAction = ({ commandBus }: RegisterActionDependencies) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  commandBus
    .execute(
      new RegisterCommand({
        email: req.body.email,
        password: req.body.password,
      }),
    )
    .then(() => {
      res.json({ sucess: true });
    })
    .catch(next);
};
export default registerAction;
