import { Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { CommandBus } from "../../../../shared/command-bus";
import { CreateTaskCommand } from "../commands/create-task.command";

export interface CreateTaskActionDependencies {
  commandBus: CommandBus;
}

export const createTaskActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: Joi.object({
      name: Joi.string().required(),
      description: Joi.string(),
      columnId: Joi.string().uuid(),
    }),
  },
  { abortEarly: false },
);

const createTaskAction = ({ commandBus }: CreateTaskActionDependencies) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  commandBus
    .execute(
      new CreateTaskCommand({
        userId: req.userId,
        name: req.body.name,
        description: req.body.description,
        columnId: req.body.columnId,
      }),
    )
    .then(() => {
      res.json({ success: true });
    })
    .catch(next);
};
export default createTaskAction;
