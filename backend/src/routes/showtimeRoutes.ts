import { Router } from 'express';
import { getShowtimes, createShowtime, getSeatsForShowtime } from '../controllers/showtimeController';

export const showtimeRoutes = Router();

showtimeRoutes.get('/', getShowtimes);
showtimeRoutes.post('/', createShowtime);
showtimeRoutes.get('/:id/seats', getSeatsForShowtime);
