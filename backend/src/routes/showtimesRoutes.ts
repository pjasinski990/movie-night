import { Router } from 'express';
import { getShowtimes, createShowtime } from '../controllers/showtimesController';

export const showtimesRoutes = Router();

showtimesRoutes.get('/', getShowtimes);
showtimesRoutes.post('/', createShowtime);
