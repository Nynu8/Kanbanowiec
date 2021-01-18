import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { CommandBus } from "../../../../shared/command-bus";
import { AddWorkerCommand } from "../commands/add-worker.command";

export interface AddWorkerActionDependencies {
  commandBus: CommandBus;
}

export const addWorkerActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: Joi.object({
      workerId: Joi.string().uuid().required(),
      taskId: Joi.string().uuid().required(),
      boardId: Joi.string().uuid().required(),
    }),
  },
  { abortEarly: false },
);

const addWorkerAction = ({ commandBus }: AddWorkerActionDependencies) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  commandBus
    .execute(
      new AddWorkerCommand({
        userId: req.userId,
        workerId: req.body.workerId,
        taskId: req.body.taskId,
        boardId: req.body.boardId,
      }),
    )
    .then(() => {
      res.json({ success: true });
    })
    .catch(next);
};
export default addWorkerAction;
