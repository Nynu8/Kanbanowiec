import { Command } from "../../../../shared/command-bus";

export const DELETE_COMMAND_TYPE = "users/DELETE";

export interface DeleteCommandPayload {
  id: string;
}

export class DeleteCommand implements Command<DeleteCommandPayload> {
  public type: string = DELETE_COMMAND_TYPE;

  constructor(public payload: DeleteCommandPayload) {}
}
