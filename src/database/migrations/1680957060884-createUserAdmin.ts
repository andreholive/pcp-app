import { MigrationInterface, QueryRunner } from "typeorm"
import { User } from "../../entities/User"

export class CreateUserAdmin1680957060884 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const user:User = new User('Admin','admin@admin.com','123456',true);
        await queryRunner.manager.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
