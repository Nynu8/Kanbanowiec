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
      username: Joi.string().min(4).required(),
      password: Joi.string().min(8).required(),
      confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
      name: Joi.string().min(3).required(),
      surname: Joi.string().min(3),
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
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
      }),
    )
    .then(() => {
      res.json({ sucess: true });
    })
    .catch(next);
};
export default registerAction;
