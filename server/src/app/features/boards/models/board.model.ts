import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

interface BoardModelProps {
  id: string;
  name: string;
}

@Entity({
  name: "board",
})
export class BoardModel {
  public static create(data: Partial<BoardModelProps>): BoardModel {
    const entity = new BoardModel();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;
}
