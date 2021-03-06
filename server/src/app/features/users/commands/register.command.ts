import { Command } from "../../../../shared/command-bus";

export const REGISTER_COMMAND_TYPE = "users/REGISTER";

export interface RegisterCommandPayload {
  username: string;
  password: string;
  name: string;
  surname?: string;
}

export class RegisterCommand implements Command<RegisterCommandPayload> {
  public type: string = REGISTER_COMMAND_TYPE;

  constructor(public payload: RegisterCommandPayload) {}
}
