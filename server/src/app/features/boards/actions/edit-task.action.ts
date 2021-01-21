import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { CommandBus } from "../../../../shared/command-bus";
import { EditTaskCommand } from "../commands/edit-task.command";

export interface EditTaskActionDependencies {
  commandBus: CommandBus;
}

export const editTaskActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: Joi.object({
      name: Joi.string(),
      description: Joi.string(),
      workerId: Joi.string().uuid(),
      boardId: Joi.string().uuid(),
      taskId: Joi.string().uuid(),
    }),
  },
  { abortEarly: false },
);

const editTaskAction = ({ commandBus }: EditTaskActionDependencies) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  commandBus
    .execute(
      new EditTaskCommand({
        userId: req.userId,
        name: req.body.name,
        description: req.body.description,
        workerId: req.body.workerId,
        boardId: req.body.boardId,
        taskId: req.body.taskId,
      }),
    )
    .then(() => {
      res.json({ success: true });
    })
    .catch(next);
};
export default editTaskAction;
