import { CommandHandler } from "../../../../shared/command-bus";
import { EDIT_COLUMN_COMMAND_TYPE, EditColumnCommand } from "../commands/edit-column.command";
import { Repository } from "typeorm";
import { UserModel } from "../../users/models/user.model";
import { PermissionModel } from "../models/permission.model";
import { UserPermission } from "../../../../../shared/enum/user-permission.enum";
import { UnauthorizedError } from "../../../../errors/unauthorized.error";
import { ColumnModel } from "../models/column.model";
import { BadRequestError } from "../../../../errors/bad-request.error";
import { ColumnColor } from "../../../../../shared/enum/column-color.enum";

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

    if (!permission || permission.type === UserPermission.User || permission.type === UserPermission.Viewer)
      throw new UnauthorizedError();

    if (index) {
      //  v   column with already useed index  v
      const anotherColumn = await columnRepository.findOne({ board: column!.board, index });
      if (anotherColumn) {
        anotherColumn.index = column.index;
        await columnRepository.save(anotherColumn!);
      }

      column.index = index;
    }

    if (newName) column!.name = newName;
    if (color) column.setColor(color);

    await columnRepository.save(column!);

    return {
      result: column,
    };
  }
}
