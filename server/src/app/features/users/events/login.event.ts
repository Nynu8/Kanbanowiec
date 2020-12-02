import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { LoginCommandPayload } from "../commands/login.command";

export default class LoginEvent implements Event {
    public name: string = "Login";
    public payload: Command<LoginCommandPayload>;
    
    static get getName() {
        return this.name;
    }

    public constructor(command: Command<LoginCommandPayload>) {
        this.payload = command;
    }
  }