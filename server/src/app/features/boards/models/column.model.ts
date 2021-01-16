import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardModel } from "./board.model";
import { ColumnColor } from "../../../../../../shared/enum/column-color.enum";

interface ColumnModelProps {
  id: string;
  index: number;
  name: string;
  color: ColumnColor;
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

  @Column({ type: "enum", enum: ColumnColor, default: ColumnColor.Black })
  color: ColumnColor;

  @ManyToOne((type) => BoardModel, { onDelete: "CASCADE" })
  @JoinColumn()
  board: BoardModel;
}
