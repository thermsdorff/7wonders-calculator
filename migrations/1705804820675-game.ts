import { MigrationInterface, QueryRunner } from "typeorm";

export class Game1705804820675 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "game" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`
    );
    await queryRunner.query(
      `CREATE TABLE "game_extensions_extension" ("gameId" integer NOT NULL, "extensionId" integer NOT NULL, CONSTRAINT "FK_5b3e02185f1ec0347128899fa34" FOREIGN KEY ("gameId") REFERENCES "game" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_d17bd54de7229ad2aa0afb2e6a0" FOREIGN KEY ("extensionId") REFERENCES "extension" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("gameId", "extensionId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5b3e02185f1ec0347128899fa3" ON "game_extensions_extension" ("gameId")`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d17bd54de7229ad2aa0afb2e6a" ON "game_extensions_extension" ("extensionId")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "game"`);
    await queryRunner.query(`DROP TABLE "game_extensions_extension"`);
    await queryRunner.query(`DROP INDEX "IDX_5b3e02185f1ec0347128899fa3"`);
    await queryRunner.query(`DROP INDEX "IDX_d17bd54de7229ad2aa0afb2e6a"`);
  }
}
