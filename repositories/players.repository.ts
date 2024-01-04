import { Repository } from "typeorm";
import { Player } from "../entities/Player";
import { BaseRepository } from "./base.repository";

export class PlayersRepository extends BaseRepository {
  repository: Repository<Player>;
  constructor() {
    super();
    this.repository = this.db.getRepository(Player);
  }

  async getAll() {
    try {
      return await this.repository.find();
    } catch (e) {
      console.log(e);
    }
  }

  async getById(id: number) {
    try {
      return await this.repository.findOneByOrFail({ id });
    } catch (e) {
      console.log(e);
    }
  }

  async create(name: string) {
    try {
      return await this.repository.insert({ name });
    } catch (e) {
      console.log(e);
    }
  }

  async update(id: number, name: string) {
    try {
      return await this.repository.update(id, { name });
    } catch (e) {
      console.log(e);
    }
  }

  async delete(id: number) {
    try {
      return await this.repository.delete({ id });
    } catch (e) {
      console.log(e);
    }
  }
}
