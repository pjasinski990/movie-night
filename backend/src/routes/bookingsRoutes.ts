import { Router } from 'express';
import { createBooking, getBookings } from '../controllers/bookingsController';

export const bookingsRoutes = Router();

bookingsRoutes.get('/', getBookings);
bookingsRoutes.post('/', createBooking);
