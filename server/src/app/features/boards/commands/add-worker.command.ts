import { Command } from "../../../../shared/command-bus";

export const ADD_WORKER_COMMAND_TYPE = "boards/ADD_WORKER";

export interface AddWorkerCommandPayload {
  userId: string;
  workerId: string;
  taskId: string;
  boardId: string;
}

export class AddWorkerCommand implements Command<AddWorkerCommandPayload> {
  public type: string = ADD_WORKER_COMMAND_TYPE;

  constructor(public payload: AddWorkerCommandPayload) {}
}
