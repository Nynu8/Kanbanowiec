import { Event } from "../../../../shared/event-dispatcher/index";

export interface RegisterEmailPayload {
  email: string;
}

export default class RegisterEmail implements Event {
  public name: string = "RegisterEmail";

  static get getName() {
    return this.name;
  }

  constructor(public payload: RegisterEmailPayload) {}
}
