import 'reflect-metadata';
import { app } from './app';
import { connectDatabase } from "./database";
import dotenv from 'dotenv';
import * as fs from "node:fs";
import path from "path";
import * as https from "node:https";
import cors from 'cors';
import express from "express";

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
        app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
        app.listen(PORT, () => {
            console.log(`Http server is running on port ${PORT}`);
        });
    } catch(error) {
        console.error(error);
    }
}

async function runHttps() {
    const sslOptions = {
        key: fs.readFileSync(path.resolve(__dirname, './certs/backend.key')),
        cert: fs.readFileSync(path.resolve(__dirname, './certs/backend.crt')),
    };

    try {
        app.use(cors({ origin: `https://${process.env.FRONTEND_DOMAIN}`}));
        const server = https.createServer(sslOptions, app);
        server.listen(PORT, () => {
            console.log(`Https server is running on port ${PORT}`)
        });
    } catch (error) {
        console.error(error);
    }
}

run().catch(err => console.error(err));
