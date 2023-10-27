import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1698283807111 implements MigrationInterface {
    name = 'MyMigration1698283807111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "likes" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "thread_id" integer, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "threads" ("id" SERIAL NOT NULL, "content" character varying, "image" character varying, "posted_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_d8a74804c34fc3900502cd27275" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "full_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "profile_picture" character varying, "profile_description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "replies" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "image" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "thread_id" integer, CONSTRAINT "PK_08f619ebe431e27e9d206bea132" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "following" ("following_id" integer NOT NULL, "follower_id" integer NOT NULL, CONSTRAINT "PK_b5a43b0475383cd39c2be06edb3" PRIMARY KEY ("following_id", "follower_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_45428a713ee7d51def21b67ff2" ON "following" ("following_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_59f580ba79fe33c121f8c3cc09" ON "following" ("follower_id") `);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_3f519ed95f775c781a254089171" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_dfee0c14f2a697eeb0b0bfc50cc" FOREIGN KEY ("thread_id") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "threads" ADD CONSTRAINT "FK_256dd2e4946d6768c5583caa072" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "replies" ADD CONSTRAINT "FK_c961efa3687d100ed22cd409534" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "replies" ADD CONSTRAINT "FK_1af58ca9000874da2171004d164" FOREIGN KEY ("thread_id") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "FK_45428a713ee7d51def21b67ff20" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "FK_59f580ba79fe33c121f8c3cc095" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "FK_59f580ba79fe33c121f8c3cc095"`);
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "FK_45428a713ee7d51def21b67ff20"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP CONSTRAINT "FK_1af58ca9000874da2171004d164"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP CONSTRAINT "FK_c961efa3687d100ed22cd409534"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP CONSTRAINT "FK_256dd2e4946d6768c5583caa072"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_dfee0c14f2a697eeb0b0bfc50cc"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_3f519ed95f775c781a254089171"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_59f580ba79fe33c121f8c3cc09"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_45428a713ee7d51def21b67ff2"`);
        await queryRunner.query(`DROP TABLE "following"`);
        await queryRunner.query(`DROP TABLE "replies"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "threads"`);
        await queryRunner.query(`DROP TABLE "likes"`);
    }

}
