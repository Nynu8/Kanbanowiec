import { Command } from "../../../../shared/command-bus";

export const LOGIN_REFRESH_COMMAND_TYPE = "users/LOGIN_REFRESH";

export interface LoginRefreshCommandPayload {
  refreshToken: string;
}

export class LoginRefreshCommand implements Command<LoginRefreshCommandPayload> {
  public type: string = LOGIN_REFRESH_COMMAND_TYPE;

  constructor(public payload: LoginRefreshCommandPayload) {}
}
