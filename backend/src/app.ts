import express from 'express';
import { movieRoutes } from './routes/movieRoutes';
import { showtimeRoutes } from './routes/showtimeRoutes';
import { uploadRoutes } from "./routes/uploadRoutes";
import path from "path";
import { seatRoutes } from "./routes/seatRoutes";
import assert from "node:assert";

validateEnvironment()

export const app = express()

app.use(express.json());

app.use('/api/movies', movieRoutes);
app.use('/api/showtimes', showtimeRoutes);
app.use('/api/bookings', seatRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

function validateEnvironment() {
    assert(process.env.MYSQL_USER)
    assert(process.env.MYSQL_PASSWORD)
    assert(process.env.MYSQL_DATABASE)

    assert(process.env.SENDGRID_API_KEY)
    assert(process.env.EMAIL_FROM)
}
