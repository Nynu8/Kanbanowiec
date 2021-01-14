import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { CreateBoardCommandPayload } from "../commands/create-board.command";

export default class CreateBoardEvent implements Event {
    public name: string = "CreateBoard";
    public payload: Command<CreateBoardCommandPayload>;
    
    static get getName() {
        return this.name;
    }

    public constructor(command: Command<CreateBoardCommandPayload>) {
        this.payload = command;
    }
  }