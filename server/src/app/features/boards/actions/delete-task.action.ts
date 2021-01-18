import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { CommandBus } from "../../../../shared/command-bus";
import { DeleteTaskCommand } from "../commands/delete-task.command";

export interface DeleteTaskActionDependencies {
  commandBus: CommandBus;
}

export const deleteTaskActionValidation = celebrate(
  {
    headers: Joi.object(),
    query: Joi.object({
      taskId: Joi.string().uuid().required(),
      boardId: Joi.string().uuid().required(),
    }),
  },
  { abortEarly: false },
);

const deleteTaskAction = ({ commandBus }: DeleteTaskActionDependencies) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  commandBus
    .execute(
      new DeleteTaskCommand({
        userId: req.userId,
        taskId: req.query.taskId,
        boardId: req.query.boardId,
      }),
    )
    .then(() => {
      res.json({ success: true });
    })
    .catch(next);
};
export default deleteTaskAction;
