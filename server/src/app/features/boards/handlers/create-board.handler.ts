import { CommandHandler } from "../../../../shared/command-bus";
import { CREATE_BOARD_COMMAND_TYPE, CreateBoardCommand } from "../commands/create-board.command";
import { EventDispatcher } from "../../../../shared/event-dispatcher";
import CreateBoardEvent from "../events/create-board.event";
import { Repository } from "typeorm";
import { UserModel } from "../../users/models/user.model";
import { BoardModel } from "../models/board.model";
import { v4 as uuid } from "uuid";

export interface CreateBoardHandlerDependencies {
  eventDispatcher: EventDispatcher;
  userRepository: Repository<UserModel>;
  boardRepository: Repository<BoardModel>;
}

export default class CreateBoardHandler implements CommandHandler<CreateBoardCommand> {
  public commandType: string = CREATE_BOARD_COMMAND_TYPE;

  constructor(private dependencies: CreateBoardHandlerDependencies) {}

  async execute({ payload }: CreateBoardCommand) {
    const { boardRepository, userRepository } = this.dependencies;
    const { id, name } = payload;
    const user = await userRepository.findOne({ id });

    const board = await boardRepository.findOne({ name });
    if (board) {
      throw new Error("Board already exists");
    }

    const newBoard = BoardModel.create({ id: uuid(), name, user });
    await boardRepository.save(newBoard);
  }
}
