import { Request, Response, NextFunction } from "express";
import { CommandBus } from "../../../../shared/command-bus";
import { DeleteCommand } from "../commands/delete.command";

export interface DeleteActionDependencies {
  commandBus: CommandBus;
}

const deleteAction = ({ commandBus }: DeleteActionDependencies) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  commandBus
    .execute(
      new DeleteCommand({
        id: req.userId,
      }),
    )
    .then((commandResult) => {
      res.json({ result: true });
    })
    .catch(next);
};
export default deleteAction;
