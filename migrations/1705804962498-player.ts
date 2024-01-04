import { MigrationInterface, QueryRunner } from "typeorm";

export class Player1705804962498 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "player" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`
    );
    await queryRunner.query(
      `CREATE TABLE "game_players_player" ("gameId" integer NOT NULL, "playerId" integer NOT NULL, CONSTRAINT "FK_93d5ad63ad904c040be60ce0712" FOREIGN KEY ("gameId") REFERENCES "game" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_2a478fe145c2b9091cb964c17b5" FOREIGN KEY ("playerId") REFERENCES "player" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("gameId", "playerId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_93d5ad63ad904c040be60ce071" ON "game_players_player" ("gameId")`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2a478fe145c2b9091cb964c17b" ON "game_players_player" ("playerId")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "player"`);
    await queryRunner.query(`DROP TABLE "game_players_player"`);
    await queryRunner.query(`DROP INDEX "IDX_93d5ad63ad904c040be60ce071"`);
    await queryRunner.query(`DROP INDEX "IDX_2a478fe145c2b9091cb964c17b"`);
  }
}
