import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { CommandBus } from "../../../../shared/command-bus";
import { AddUserCommand } from "../commands/add-user.command";

export interface AddUserActionDependencies {
  commandBus: CommandBus;
}

export const addUserActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: Joi.object({
      boardId: Joi.string().uuid().required(),
      userName: Joi.string().min(1).required(),
      permission: Joi.required(),
    }),
  },
  { abortEarly: false },
);

const addUserAction = ({ commandBus }: AddUserActionDependencies) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  commandBus
    .execute(
      new AddUserCommand({
        userId: req.userId,
        boardId: req.body.boardId,
        userName: req.body.userName,
        permission: req.body.permission,
      }),
    )
    .then((commandResult) => {
      res.json(commandResult.result);
    })
    .catch(next);
};
export default addUserAction;
