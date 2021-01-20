import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { CommandBus } from "../../../../shared/command-bus";
import { DeleteColumnCommand } from "../commands/delete-column.command";

export interface DeleteColumnActionDependencies {
  commandBus: CommandBus;
}

export const deleteColumnActionValidation = celebrate(
  {
    headers: Joi.object(),
    query: Joi.object({
      columnId: Joi.string().uuid(),
    }),
  },
  { abortEarly: false },
);

const deleteColumnAction = ({ commandBus }: DeleteColumnActionDependencies) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  commandBus
    .execute(
      new DeleteColumnCommand({
        userId: req.userId,
        columnId: req.query.columnId as string,
      }),
    )
    .then(() => {
      res.json({ success: true });
    })
    .catch(next);
};
export default deleteColumnAction;
