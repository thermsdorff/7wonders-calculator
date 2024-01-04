import { DataSource } from "typeorm";
import { Player, Extension, Game, Score, ScoreType } from "../entities";
import { Extension1705804769338 } from "../migrations/1705804769338-extension";
import { Game1705804820675 } from "../migrations/1705804820675-game";
import { Player1705804962498 } from "../migrations/1705804962498-player";
import { Score1705805140169 } from "../migrations/1705805140169-score";
import { ScoreType1705805200545 } from "../migrations/1705805200545-score-type";

export default new DataSource({
  type: "expo",
  database: "7wonders-calculator",
  driver: require("expo-sqlite"),
  synchronize: false,
  migrationsRun: true,
  logging: true,
  entities: [Player, Extension, Game, Score, ScoreType],
  subscribers: [],
  migrations: [
    Extension1705804769338,
    Game1705804820675,
    Player1705804962498,
    Score1705805140169,
    ScoreType1705805200545,
  ],
});
