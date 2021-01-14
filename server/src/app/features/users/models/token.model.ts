import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserModel } from "./user.model";

interface TokenModelProps {
  id: string;
  token: string;
  user: UserModel;
}

@Entity({
  name: "token",
})
export class TokenModel {
  public static create(data: Partial<TokenModelProps>): TokenModel {
    const entity = new TokenModel();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  token: string;

  @OneToOne((type) => UserModel, { onDelete: "CASCADE" })
  @JoinColumn()
  user: UserModel;
}
