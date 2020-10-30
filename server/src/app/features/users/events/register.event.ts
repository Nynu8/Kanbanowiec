import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { RegisterCommandPayload } from "../commands/register.command";

export default class RegisterEvent implements Event {
    public name: string = "Register";
    public payload: Command<RegisterCommandPayload>;
    
    static get getName() {
        return this.name;
    }

    public constructor(command: Command<RegisterCommandPayload>) {
        this.payload = command;
    }
  }