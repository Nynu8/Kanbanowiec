import { CommandHandler } from "../../../../shared/command-bus";
import { CREATE_COLUMN_COMMAND_TYPE, CreateColumnCommand } from "../commands/create-column.command";
import { Repository } from "typeorm";
import { ColumnModel } from "../models/column.model";
import { BoardModel } from "../models/board.model";
import { BadRequestError } from "../../../../errors/bad-request.error";
import { ColumnColor } from "../../../../../../shared/enum/column-color.enum";

export interface CreateColumnHandlerDependencies {
  columnRepository: Repository<ColumnModel>;
  boardRepository: Repository<BoardModel>;
}

export default class CreateColumnHandler implements CommandHandler<CreateColumnCommand> {
  public commandType: string = CREATE_COLUMN_COMMAND_TYPE;

  constructor(private dependencies: CreateColumnHandlerDependencies) {}

  async execute({ payload }: CreateColumnCommand) {
    const { boardRepository, columnRepository } = this.dependencies;
    const { boardId, index, name } = payload;

    const board = await boardRepository.findOne({ id: boardId });

    if (!board) {
      throw new BadRequestError("Board not found");
    }

    const columns = await columnRepository.find({ board });
    for (const column of columns) {
      if (column.index === index) {
        throw new BadRequestError("Column index already used");
      }
    }

    const column = ColumnModel.create({ name, index, board });
    await columnRepository.save(column);
  }
}
