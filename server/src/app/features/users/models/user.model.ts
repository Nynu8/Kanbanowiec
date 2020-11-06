import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import UserPassword from "../services/user-password.service";

interface UserModelProps {
  id: string;
  username: string;
  password: string;
  salt: string;
  name: string;
  surname?: string;
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
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  surname?: string;

  public setPassword(password: string) {
    const { saltyPassword, salt } = UserPassword.generate(password);
    this.password = saltyPassword;
    this.salt = salt;
  }
}
