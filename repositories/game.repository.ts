import { Repository } from "typeorm";
import { Game } from "../entities/Game";
import { BaseRepository } from "./base.repository";

export class GameRepository extends BaseRepository {
  repository: Repository<Game>;
  constructor() {
    super();
    this.repository = this.db.getRepository(Game);
  }

  async create(game: Game) {
    return await this.repository.save(game);
  }

  async delete(id: number) {
    return await this.repository.delete({ id });
  }

  async getOne(id: number) {
    return await this.repository.findOne({
      where: { id },
      relations: {
        players: true,
        extensions: true,
        scores: true,
      },
    });
  }

  async getAll() {
    return await this.repository.find({
      relations: { players: true, extensions: true, scores: true },
    });
  }
}
