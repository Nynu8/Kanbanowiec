import { Command } from "../../../../shared/command-bus";

export const DELETE_BOARD_COMMAND_TYPE = "boards/DeleteBoard";

export interface DeleteBoardCommandPayload {
  userId: string;
  boardId: string;
}

export class DeleteBoardCommand implements Command<DeleteBoardCommandPayload> {
  public type: string = DELETE_BOARD_COMMAND_TYPE;

  constructor(public payload: DeleteBoardCommandPayload) {}
}
