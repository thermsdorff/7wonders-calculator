import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Extension } from "./Extension";
import { Player, Score } from ".";

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @ManyToMany(() => Extension, { cascade: true, onDelete: "CASCADE" })
  @JoinTable()
  extensions: Extension[];

  @ManyToMany(() => Player)
  @JoinTable()
  players: Player[];

  @OneToMany(() => Score, (score) => score.game, {
    cascade: true,
    onDelete: "CASCADE",
  })
  scores: Score[];

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
