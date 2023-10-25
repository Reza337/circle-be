import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1698160856352 implements MigrationInterface {
    name = 'MyMigration1698160856352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "likes" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "thread_id" integer, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "following" ("id" SERIAL NOT NULL, "following_id" integer, "follower_id" integer, CONSTRAINT "PK_c76c6e044bdf76ecf8bfb82a645" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_3f519ed95f775c781a254089171" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_dfee0c14f2a697eeb0b0bfc50cc" FOREIGN KEY ("thread_id") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "FK_45428a713ee7d51def21b67ff20" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "FK_59f580ba79fe33c121f8c3cc095" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "FK_59f580ba79fe33c121f8c3cc095"`);
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "FK_45428a713ee7d51def21b67ff20"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_dfee0c14f2a697eeb0b0bfc50cc"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_3f519ed95f775c781a254089171"`);
        await queryRunner.query(`DROP TABLE "following"`);
        await queryRunner.query(`DROP TABLE "likes"`);
    }

}
