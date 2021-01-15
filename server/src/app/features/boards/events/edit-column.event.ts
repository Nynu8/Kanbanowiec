import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { EditColumnCommandPayload } from "../commands/edit-column.command";

export default class EditColumnEvent implements Event {
    public name: string = "EditColumn";
    public payload: Command<EditColumnCommandPayload>;
    
    static get getName() {
        return this.name;
    }

    public constructor(command: Command<EditColumnCommandPayload>) {
        this.payload = command;
    }
  }