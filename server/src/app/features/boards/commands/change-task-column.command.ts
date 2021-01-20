import { Command } from "../../../../shared/command-bus";

export const CHANGE_TASK_COLUMN_COMMAND_TYPE = "boards/CHANGE_TASK_COLUMN";

export interface ChangeTaskColumnCommandPayload {
  userId: string;
  columnId: string;
  taskId: string;
}

export class ChangeTaskColumnCommand implements Command<ChangeTaskColumnCommandPayload> {
  public type: string = CHANGE_TASK_COLUMN_COMMAND_TYPE;

  constructor(public payload: ChangeTaskColumnCommandPayload) {}
}
