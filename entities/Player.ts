import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Score } from "./Score";

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @OneToMany(() => Score, (score) => score.player, {
    cascade: true,
    onDelete: "CASCADE",
  })
  scores: Score[];

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
