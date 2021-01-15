import { CommandHandler } from "../../../../shared/command-bus";
import { EDIT_COLUMN_COMMAND_TYPE, EditColumnCommand } from "../commands/edit-column.command";
import { Repository } from "typeorm";
import { UserModel } from "../../users/models/user.model";
import { PermissionModel } from "../models/permission.model";
import { UserPermission } from "../models/user-permission.enum";
import { UnauthorizedError } from "../../../../errors/unauthorized.error";
import { ColumnModel } from "../models/column.model";
import { BadRequestError } from "../../../../errors/bad-request.error";
import { ColumnColor } from "../models/column-color.enum";

export interface EditColumnHandlerDependencies {
  userRepository: Repository<UserModel>;
  permissionRepository: Repository<PermissionModel>;
  columnRepository: Repository<ColumnModel>;
}

export default class EditColumnHandler implements CommandHandler<EditColumnCommand> {
  public commandType: string = EDIT_COLUMN_COMMAND_TYPE;

  constructor(private dependencies: EditColumnHandlerDependencies) {}

  async execute({ payload }: EditColumnCommand) {
    const { userRepository, permissionRepository, columnRepository } = this.dependencies;
    const { userId, columnId, newName, index, color } = payload;

    const column = await columnRepository.findOne({ where: { id: columnId }, relations: ["board"] });
    if (!column) throw new BadRequestError("Column not found");

    const user = await userRepository.findOne({ id: userId });
    const permission = await permissionRepository.findOne({ user, board: column!.board });

    if (!permission) throw new UnauthorizedError();

    if (permission!.type == UserPermission.Owner || permission!.type == UserPermission.Administrator) {
      const columns = await columnRepository.find({ board: column!.board });

      for (const col of columns) {
        if (col.index === index) {
          col.index = column.index;
          column.index = index;
          columnRepository.save(col!);
        }
      }

      if (newName != null) column!.name = newName;
      //if (color != null) column!.color = ColumnColor[color];

      columnRepository.save(column!);
    }

    return {
      result: column,
    };
  }
}
