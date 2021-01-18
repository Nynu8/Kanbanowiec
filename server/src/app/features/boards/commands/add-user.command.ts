import { Command } from "../../../../shared/command-bus";
import { UserPermission } from "../models/user-permission.enum";

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
