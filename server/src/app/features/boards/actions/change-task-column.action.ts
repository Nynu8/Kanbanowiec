import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { CommandBus } from "../../../../shared/command-bus";
import { ChangeTaskColumnCommand } from "../commands/change-task-column.command";

export interface ChangeTaskColumnActionDependencies {
  commandBus: CommandBus;
}

export const changeTaskColumnActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: Joi.object({
      columnId: Joi.string().uuid().required(),
      taskId: Joi.string().uuid().required(),
    }),
  },
  { abortEarly: false },
);

const changeTaskColumnAction = ({ commandBus }: ChangeTaskColumnActionDependencies) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  commandBus
    .execute(
      new ChangeTaskColumnCommand({
        userId: req.userId,
        columnId: req.body.columnId,
        taskId: req.body.taskId,
      }),
    )
    .then(() => {
      res.json({ success: true });
    })
    .catch(next);
};
export default changeTaskColumnAction;
