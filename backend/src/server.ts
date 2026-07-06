import 'reflect-metadata';
import { app } from './app';
import { connectDatabase } from "./database";
import dotenv from 'dotenv';
import * as fs from "node:fs";
import path from "path";
import * as https from "node:https";
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function run() {
    try {
        await connectDatabase();
         await runServer()
    } catch (error) {
        console.error(error);
    }
}

async function runServer() {
    try {
        app.listen(PORT, () => {
            console.log(`Http server is running on port ${PORT}`);
        });
    } catch(error) {
        console.error(error);
    }
}

run().catch(err => console.error(err));

