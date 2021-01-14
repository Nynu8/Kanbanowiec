import { Command } from "../../../../shared/command-bus";

export const CREATE_BOARD_COMMAND_TYPE = "boards/CREATE_BOARD";

export interface CreateBoardCommandPayload {
  id: string;
  name: string;
}

export class CreateBoardCommand implements Command<CreateBoardCommandPayload> {
  public type: string = CREATE_BOARD_COMMAND_TYPE;

  constructor(public payload: CreateBoardCommandPayload) {}
}
