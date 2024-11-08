import 'reflect-metadata';
import { app } from './app';
import { connectDatabase } from "./database";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

async function runServer() {
    connectDatabase().then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
}

runServer().catch(err => console.log(err));
