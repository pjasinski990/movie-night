import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: ['src/entities/**/*.ts'],
    synchronize: true,
    logging: true,
});

export async function connectDatabase() {
    AppDataSource.initialize()
        .then(() => console.log("Database connected"))
        .catch((error) => console.error("Error during database connection", error));
}
