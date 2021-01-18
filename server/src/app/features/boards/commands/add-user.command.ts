import { UserPermission } from "../../../../../shared/enum/user-permission.enum";
import { Command } from "../../../../shared/command-bus";

export const ADD_USER_COMMAND_TYPE = "boards/ADD_USER";

export interface AddUserCommandPayload {
  userId: string;
  boardId: string;
  userName: string;
  permission: UserPermission;
}

export class AddUserCommand implements Command<AddUserCommandPayload> {
  public type: string = ADD_USER_COMMAND_TYPE;

  constructor(public payload: AddUserCommandPayload) {}
}
