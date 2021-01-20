import { Command } from "../../../../shared/command-bus";

export const EDIT_TASK_COMMAND_TYPE = "boards/EDIT_TASK";

export interface EditTaskCommandPayload {
  userId: string;
  name: string;
  description: string;
  workerId: string;
  boardId: string;
  taskId: string;
}

export class EditTaskCommand implements Command<EditTaskCommandPayload> {
  public type: string = EDIT_TASK_COMMAND_TYPE;

  constructor(public payload: EditTaskCommandPayload) {}
}
