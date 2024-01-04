import database from "../services/database";
import { DataSource } from "typeorm";

export class BaseRepository {
  protected db: DataSource;

  constructor() {
    this.db = database;
  }
}
