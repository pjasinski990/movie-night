import express from 'express';
import { movieRoutes } from './routes/movieRoutes';
import { showtimeRoutes } from './routes/showtimeRoutes';
import { uploadRoutes } from "./routes/uploadRoutes";
import path from "path";
import { seatRoutes } from "./routes/seatRoutes";

export const app = express();

app.use(express.json());

app.use('/api/movies', movieRoutes);
app.use('/api/showtimes', showtimeRoutes);
app.use('/api/bookings', seatRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
