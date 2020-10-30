import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

interface UserModelProps {
  id: string;
  email: string;
  password: string;
}

@Entity({
  name: "user",
})
export class UserModel {
  public static create(data: Partial<UserModelProps>): UserModel {
    const entity = new UserModel();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
