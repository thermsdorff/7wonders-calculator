import { Repository } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Score } from "../entities/Score";
import { Player } from "../entities/Player";

export class ScoreRepository extends BaseRepository {
  repository: Repository<Score>;
  constructor() {
    super();
    this.repository = this.db.getRepository(Score);
  }

  async findOneByPlayer(player: Player) {
    return await this.repository.findOneBy({ player });
  }

  async findByGameId(id: number) {
    return await this.repository.find({
      where: { game: { id } },
      relations: {
        player: true,
        scoreTypes: true,
      },
    });
  }
}
