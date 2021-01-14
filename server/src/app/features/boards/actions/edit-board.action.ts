import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { CommandBus } from "../../../../shared/command-bus";
import { EditBoardCommand } from "../commands/edit-board.command";

export interface EditBoardActionDependencies {
  commandBus: CommandBus;
}

export const editBoardActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: Joi.object({
      boardId: Joi.string().uuid().required(),
      newName: Joi.string().min(1).required(),
    }),
  },
  { abortEarly: false },
);

const editBoardAction = ({ commandBus }: EditBoardActionDependencies) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  commandBus
    .execute(
      new EditBoardCommand({
        userId: req.userId,
        boardId: req.body.boardId,
        newName: req.body.newName,
      }),
    )
    .then(() => {
      res.json({ sucess: true });
    })
    .catch(next);
};
export default editBoardAction;
