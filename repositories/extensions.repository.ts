import { Repository } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Extension } from "../entities/Extension";

export class ExtensionsRepository extends BaseRepository {
  repository: Repository<Extension>;
  constructor() {
    super();
    this.repository = this.db.getRepository(Extension);
  }

  async getAll() {
    try {
      return await this.repository.find();
    } catch (e) {
      console.log(e);
    }
  }

  async getActivated() {
    try {
      return await this.repository.findBy({ status: true });
    } catch (e) {
      console.log(e);
    }
  }

  async update(id: number, value: Extension) {
    try {
      return await this.repository.update(id, value);
    } catch (e) {
      console.log(e);
    }
  }
}
