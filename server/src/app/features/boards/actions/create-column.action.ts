import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { CommandBus } from "../../../../shared/command-bus";
import { CreateColumnCommand } from "../commands/create-column.command";

export interface CreateColumnActionDependencies {
  commandBus: CommandBus;
}

export const createColumnActionValidation = celebrate(
  {
    body: Joi.object({
      index: Joi.number().required(),
      name: Joi.string().required(),
      boardId: Joi.string().uuid().required(),
    }),
  },
  { abortEarly: false },
);

const createColumnAction = ({ commandBus }: CreateColumnActionDependencies) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  commandBus
    .execute(
      new CreateColumnCommand({
        index: req.body.index,
        name: req.body.name,
        boardId: req.body.boardId,
      }),
    )
    .then(() => {
      res.json({ success: true });
    })
    .catch(next);
};
export default createColumnAction;
