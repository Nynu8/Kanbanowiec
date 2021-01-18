import { Request, Response, NextFunction } from "express";
import { CommandBus } from "../../../../shared/command-bus";
import { DeleteUserCommand } from "../commands/delete-user.command";

export interface DeleteUserActionDependencies {
  commandBus: CommandBus;
}

const deleteUserAction = ({ commandBus }: DeleteUserActionDependencies) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  commandBus
    .execute(
      new DeleteUserCommand({
        id: req.userId,
      }),
    )
    .then(() => {
      res.json({ result: true });
    })
    .catch(next);
};
export default deleteUserAction;
