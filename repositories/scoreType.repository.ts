import { Repository } from "typeorm";
import { ScoreType } from "../entities/ScoreType";
import { BaseRepository } from "./base.repository";

export enum CountType {
  WONDER = "wonder",
  MONEY = "money",
  MILITARY = "military",
  CIVIL = "civil",
  MARKET = "market",
  SCIENTIST = "scientist",
  GUILD = "guild",
  CITIES = "cities",
  LEADERS = "leaders",
  BATTLESHIP = "battleship",
  ISLANDS = "islands",
}

export class ScoreTypeRepository extends BaseRepository {
  repository: Repository<ScoreType>;
  constructor() {
    super();
    this.repository = this.db.getRepository(ScoreType);
  }

  async save(scoreType: ScoreType) {
    return await this.repository.save(scoreType);
  }

  async insert(scoreTypes) {
    return await this.repository.insert(scoreTypes);
  }
}
