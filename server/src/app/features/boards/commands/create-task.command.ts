import { Command } from "../../../../shared/command-bus";

export const CREATE_TASK_COMMAND_TYPE = "boards/CREATE_TASK";

export interface CreateTaskCommandPayload {
  userId: string;
  name: string;
  description: string;
  columnId: string;
}

export class CreateTaskCommand implements Command<CreateTaskCommandPayload> {
  public type: string = CREATE_TASK_COMMAND_TYPE;

  constructor(public payload: CreateTaskCommandPayload) {}
}
