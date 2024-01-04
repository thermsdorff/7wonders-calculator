import { MigrationInterface, QueryRunner } from "typeorm";

export class ScoreType1705805200545 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "score_type" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" text NOT NULL, "nbCard" integer NOT NULL, "points" integer NOT NULL, "scoreId" integer, CONSTRAINT "FK_644f4656e5c5c2c4c4a2739bef4" FOREIGN KEY ("scoreId") REFERENCES "score" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "score_type"`);
  }
}
