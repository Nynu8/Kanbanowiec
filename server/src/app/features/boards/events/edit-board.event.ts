import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { EditBoardCommandPayload } from "../commands/edit-board.command";

export default class EditBoardEvent implements Event {
    public name: string = "EditBoard";
    public payload: Command<EditBoardCommandPayload>;
    
    static get getName() {
        return this.name;
    }

    public constructor(command: Command<EditBoardCommandPayload>) {
        this.payload = command;
    }
  }