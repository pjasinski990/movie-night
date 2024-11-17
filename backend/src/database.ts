import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
    type: 'mysql',
    port: 3306,
    host: process.env.MYSQL_HOST || 'localhost',
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: isProduction ?
        ['dist/entities/**/*.js']
        : ['src/entities/**/*.ts'],
    synchronize: true,
    logging: true,
});

export async function connectDatabase() {
    try {
        await AppDataSource.initialize();
        console.log("Database connected");
    } catch (error) {
        console.error("Error during database connection", error);
        throw error;
    }
}
