import { Command } from "../../../../shared/command-bus";
import { ColumnColor } from "../../../../../shared/enum/column-color.enum";

export const EDIT_COLUMN_COMMAND_TYPE = "boards/EDIT_COLUMN";

export interface EditColumnCommandPayload {
  userId: string;
  columnId: string;
  newName: string;
  index: number;
  color: ColumnColor;
}

export class EditColumnCommand implements Command<EditColumnCommandPayload> {
  public type: string = EDIT_COLUMN_COMMAND_TYPE;

  constructor(public payload: EditColumnCommandPayload) {}
}
