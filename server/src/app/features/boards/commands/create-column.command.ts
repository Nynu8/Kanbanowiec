import { Command } from "../../../../shared/command-bus";

export const CREATE_COLUMN_COMMAND_TYPE = "boards/CREATE_COLUMN";

export interface CreateColumnCommandPayload {
  index: number;
  name: string;
  boardId: string;
}

export class CreateColumnCommand implements Command<CreateColumnCommandPayload> {
  public type: string = CREATE_COLUMN_COMMAND_TYPE;

  constructor(public payload: CreateColumnCommandPayload) {}
}
