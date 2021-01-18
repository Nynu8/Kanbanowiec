import { Command } from "../../../../shared/command-bus";

export const DELETE_TASK_COMMAND_TYPE = "boards/DELETE_TASK";

export interface DeleteTaskCommandPayload {
  userId: string;
  boardId: string;
  taskId: string;
}

export class DeleteTaskCommand implements Command<DeleteTaskCommandPayload> {
  public type: string = DELETE_TASK_COMMAND_TYPE;

  constructor(public payload: DeleteTaskCommandPayload) {}
}
