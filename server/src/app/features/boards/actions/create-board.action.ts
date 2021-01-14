import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { CommandBus } from "../../../../shared/command-bus";
import { CreateBoardCommand } from "../commands/create-board.command";
import { MinKey } from "typeorm";

export interface CreateBoardActionDependencies {
  commandBus: CommandBus;
}

export const createBoardActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: Joi.object({
      name: Joi.string().min(1).required(),
    }),
  },
  { abortEarly: false },
);

const createBoardAction = ({ commandBus }: CreateBoardActionDependencies) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  commandBus
    .execute(
      new CreateBoardCommand({
        id: req.userId,
        name: req.body.name,
      }),
    )
    .then(() => {
      res.json({ sucess: true });
    })
    .catch(next);
};
export default createBoardAction;
