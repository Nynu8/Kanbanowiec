import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { AddUserCommandPayload } from "../commands/add-user.command";

export default class AddUserEvent implements Event {
    public name: string = "AddUser";
    public payload: Command<AddUserCommandPayload>;
    
    static get getName() {
        return this.name;
    }

    public constructor(command: Command<AddUserCommandPayload>) {
        this.payload = command;
    }
  }