import { ExtensionsRepository } from "./extensions.repository";
import { GameRepository } from "./game.repository";
import { PlayersRepository } from "./players.repository";
import { ScoreRepository } from "./score.repository";
import { ScoreTypeRepository } from "./scoreType.repository";

export const playersRepository = new PlayersRepository();
export const extensionsRepository = new ExtensionsRepository();
export const scoreTypeRepository = new ScoreTypeRepository();
export const scoreRepository = new ScoreRepository();
export const gameRepository = new GameRepository();
