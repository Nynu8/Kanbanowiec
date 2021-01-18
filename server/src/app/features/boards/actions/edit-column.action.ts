import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { CommandBus } from "../../../../shared/command-bus";
import { EditColumnCommand } from "../commands/edit-column.command";

export interface EditColumnActionDependencies {
  commandBus: CommandBus;
}

export const editColumnActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: Joi.object({
      columnId: Joi.string().uuid().required(),
      newName: Joi.string().min(1),
      index: Joi.number(),
      color: Joi.string().valid("red", "orange", "yellow", "green", "blue", "purple", "black", "white", "brown"),
    }),
  },
  { abortEarly: false },
);

const editColumnAction = ({ commandBus }: EditColumnActionDependencies) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  commandBus
    .execute(
      new EditColumnCommand({
        userId: req.userId,
        columnId: req.body.columnId,
        newName: req.body.newName,
        index: req.body.index,
        color: req.body.color,
      }),
    )
    .then((commandResult) => {
      res.json(commandResult.result);
    })
    .catch(next);
};
export default editColumnAction;
