import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserModel } from "../../users/models/user.model";
import { ColumnModel } from "./column.model";

interface TaskModelProps {
  name: string;
  description: string;
  creator: UserModel;
  column: ColumnModel;
}

@Entity({
  name: "task",
})
export class TaskModel {
  public static create(data: Partial<TaskModelProps>): TaskModel {
    const entity = new TaskModel();
    Object.assign(entity, data);
    entity.createdAt = new Date();
    return entity;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => UserModel, { onDelete: "CASCADE" })
  creator: UserModel;

  @ManyToOne(() => UserModel, { onDelete: "CASCADE" })
  worker?: UserModel;

  @ManyToOne(() => ColumnModel, { onDelete: "CASCADE" })
  column: ColumnModel;
}
