import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Extension {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column({ type: "boolean", default: false })
  status: boolean;
}
