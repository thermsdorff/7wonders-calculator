import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Score } from ".";

@Entity()
export class ScoreType {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Score, (score) => score.scoreTypes)
  score: Score;

  @Column("text")
  type: string;

  @Column("int")
  nbCard: number;

  @Column("int")
  points: number;
}
