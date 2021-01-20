import { Command } from "../../../../shared/command-bus";

export const DELETE_COLUMN_COMMAND_TYPE = "boards/DELETE_COLUMN";

export interface DeleteColumnCommandPayload {
  userId: string;
  columnId: string;
}

export class DeleteColumnCommand implements Command<DeleteColumnCommandPayload> {
  public type: string = DELETE_COLUMN_COMMAND_TYPE;

  constructor(public payload: DeleteColumnCommandPayload) {}
}
