import { DataSource } from "typeorm";
import { User } from "../entities/User";

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "senha123",
    database: "appPcp",
    entities: [User],
    //migrations: ["./src/database/migrations/*.ts"],
    synchronize: true,
    logging: false,
})

AppDataSource.initialize().then(() => {
    console.log('data source inicializado!')
}).catch((err: any) => {
    console.log(err)
});

export const appDataSource = AppDataSource;