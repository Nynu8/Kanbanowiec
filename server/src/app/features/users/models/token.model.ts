import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import AccessToken from "../services/access-token.service";

interface TokenModelProps {
  id: string;
  userId: string;
  token: string;
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
  userId: string;

  @Column()
  token: string;
}
