import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { CommandBus } from "../../../../shared/command-bus";
import { RegisterCommand } from "../commands/register.command";

export interface RegisterActionDependencies {
  commandBus: CommandBus;
}

export const registerBodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

export const registerActionValidation = celebrate(
  {
    body: registerBodySchema,
  },
  { abortEarly: false },
);

/**
 * @swagger
 *
 * /api/users/register:
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
      res.json();
    })
    .catch(next);
};
export default registerAction;
