import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Game, Player, ScoreType } from ".";

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Game, (game) => game.scores)
  @JoinColumn()
  game: Game;

  @ManyToOne(() => Player, (player) => player.scores)
  @JoinColumn()
  player: Player;

  @OneToMany(() => ScoreType, (scoreType) => scoreType.score, {
    cascade: true,
    onDelete: "CASCADE",
  })
  scoreTypes: ScoreType[];
}
