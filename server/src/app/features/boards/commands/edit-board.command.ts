import { Command } from "../../../../shared/command-bus";

export const EDIT_BOARD_COMMAND_TYPE = "boards/EDIT_BOARD";

export interface EditBoardCommandPayload {
  userId: string;
  boardId: string;
  newName: string;
}

export class EditBoardCommand implements Command<EditBoardCommandPayload> {
  public type: string = EDIT_BOARD_COMMAND_TYPE;

  constructor(public payload: EditBoardCommandPayload) {}
}
