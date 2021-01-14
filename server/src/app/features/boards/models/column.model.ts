import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardModel } from "./board.model";

interface ColumnModelProps {
  id: string;
  index: number;
  name: string;
  board: BoardModel;
}

@Entity({
  name: "column",
})
export class ColumnModel {
  public static create(data: Partial<ColumnModelProps>): ColumnModel {
    const entity = new ColumnModel();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  index: number;

  @Column()
  name: string;

  @ManyToOne((type) => BoardModel, { onDelete: "CASCADE" })
  board: BoardModel;
}
