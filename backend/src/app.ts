import express from 'express';
import { moviesRoutes } from './routes/moviesRoutes';
import { showtimesRoutes } from './routes/showtimesRoutes';
import { bookingsRoutes } from './routes/bookingsRoutes';
import { uploadRoutes } from "./routes/uploadRoutes";
import path from "path";

export const app = express();

app.use(express.json());

app.use('/api/movies', moviesRoutes);
app.use('/api/showtimes', showtimesRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
