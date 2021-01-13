import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { ChangeUserDetailsCommandPayload } from "../commands/change-user-details.command";

export default class ChangeUserDetailsEvent implements Event {
    public name: string = "ChangeUserDetails";
    public payload: Command<ChangeUserDetailsCommandPayload>;
    
    static get getName() {
        return this.name;
    }

    public constructor(command: Command<ChangeUserDetailsCommandPayload>) {
        this.payload = command;
    }
  }