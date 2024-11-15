import { Request, Response } from 'express';
import { AppDataSource } from "../database";
import { Booking } from '../entities/Booking';
import { Buyer } from '../entities/Buyer';
import { Seat } from '../entities/Seat';
import { In } from 'typeorm';
import { createRouteErrorResponse } from "../util";

export const createBooking = async (req: Request, res: Response) => {
    try {
        const { buyerName, buyerEmail, seatIds } = req.body;
        let buyer = await AppDataSource.getRepository(Buyer).findOne({ where: { email: buyerEmail } });
        if (!buyer) {
            buyer = await AppDataSource.getRepository(Buyer).save({name: buyerName, email: buyerEmail});
        }

        const seatRepository = AppDataSource.getRepository(Seat);
        const bookingRepository = AppDataSource.getRepository(Booking);

        const seats = await seatRepository.find({
            where: { id: In(seatIds) },
        });

        if (seats.length !== seatIds.length) {
            res.status(400).json({ message: 'Some seats not found' });
            return
        }

        for (const seat of seats) {
            if (seat.booking) {
                res.status(400).json({ message: `Seat ${seat.label} is already booked` });
                return
            }
        }

        const bookings = seats.map(seat => {
            return bookingRepository.create({
                buyer: buyer,
                seat,
                showtime: seat.showtime,
            });
        });

        await bookingRepository.save(bookings);

        res.status(201).json(bookings);
    } catch (error) {
        createRouteErrorResponse(error, req, res);
    }
};
