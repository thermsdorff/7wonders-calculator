import { MigrationInterface, QueryRunner } from "typeorm";

export class Score1705805140169 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "score" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "gameId" integer, "playerId" integer, CONSTRAINT "REL_66f5fb8ee865712db248080d5e" UNIQUE ("playerId", "gameId"), CONSTRAINT "FK_0778913dcc5349f3bcb0ebeab8c" FOREIGN KEY ("gameId") REFERENCES "game" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_66f5fb8ee865712db248080d5ea" FOREIGN KEY ("playerId") REFERENCES "player" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "score"`);
  }
}
