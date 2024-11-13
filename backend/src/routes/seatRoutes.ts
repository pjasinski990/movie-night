import { Router } from 'express';
import { createBooking } from "../controllers/seatController";

export const seatRoutes = Router();

seatRoutes.post('/book', createBooking);
