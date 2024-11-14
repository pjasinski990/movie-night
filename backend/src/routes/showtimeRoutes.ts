import { Router } from 'express';
import { getShowtimes, createShowtime, getSeatsForShowtime, deleteShowtime } from '../controllers/showtimeController';

export const showtimeRoutes = Router();

showtimeRoutes.get('/', getShowtimes);
showtimeRoutes.post('/', createShowtime);
showtimeRoutes.delete('/', deleteShowtime);
showtimeRoutes.get('/:id/seats', getSeatsForShowtime);
