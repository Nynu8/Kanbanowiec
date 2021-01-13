import { Command } from "../../../../shared/command-bus";

export const CHANGE_USER_DETAILS_COMMAND_TYPE = "users/CHANGE_USER_DETAILS";

export interface ChangeUserDetailsCommandPayload {
  id: string;
  username?: string;
  name?: string;
  surname?: string;
}

export class ChangeUserDetailsCommand implements Command<ChangeUserDetailsCommandPayload> {
  public type: string = CHANGE_USER_DETAILS_COMMAND_TYPE;

  constructor(public payload: ChangeUserDetailsCommandPayload) {}
}
