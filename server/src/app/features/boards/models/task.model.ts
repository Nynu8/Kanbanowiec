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

  public setWorker(worker: UserModel) {
    this.worker = worker;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => UserModel, { onDelete: "CASCADE", nullable: false })
  creator: UserModel;

  @ManyToOne(() => UserModel, { onDelete: "CASCADE" })
  worker?: UserModel;

  @ManyToOne(() => ColumnModel, { onDelete: "CASCADE", nullable: false })
  column: ColumnModel;
}
