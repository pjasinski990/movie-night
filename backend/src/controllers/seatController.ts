import { Request, Response } from 'express';
import { AppDataSource } from "../database";
import { Booking } from '../entities/Booking';
import { Buyer } from '../entities/Buyer';
import { Seat } from '../entities/Seat';
import { In } from 'typeorm';
import { createRouteErrorResponse } from "../util";
import { EmailService } from "../tickets/emailService";
import { generateMovieTicketEmail } from "../tickets/emailTicketGenerator";
import { qrCode } from "../../resources/qr-code";
import Attachment from "@sendgrid/helpers/classes/attachment";

export const createBooking = async (req: Request, res: Response) => {
    try {
        const { buyerEmail, seatIds } = req.body;
        let buyer = await AppDataSource.getRepository(Buyer).findOne({ where: { email: buyerEmail } });
        if (!buyer) {
            buyer = await AppDataSource.getRepository(Buyer).save({ email: buyerEmail });
        }

        const seatRepository = AppDataSource.getRepository(Seat);
        const bookingRepository = AppDataSource.getRepository(Booking);

        const seats = await seatRepository.find({
            where: { id: In(seatIds) },
            relations: ['booking', 'showtime', 'showtime.movie'],
        });

        if (seats.length !== seatIds.length) {
            res.status(400).json({ message: 'Some seats not found' });
            return;
        }

        for (const seat of seats) {
            if (seat.booking) {
                res.status(400).json({ message: `Seat ${seat.label} is already booked` });
                return;
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

        const savedBookings = await bookingRepository.find({
            where: { id: In(bookings.map(b => b.id)) },
            relations: ['buyer', 'seat', 'showtime', 'showtime.movie'],
        });

        const tickets = savedBookings.map(booking => ({
            movie: booking.showtime.movie.title,
            date: booking.showtime.show_date.toLocaleDateString(),
            time: booking.showtime.show_date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            seat: booking.seat.label,
        }));

        const qrCodeCID = 'qr-code'
        const { html, plainText } = generateMovieTicketEmail(tickets, qrCodeCID);

        await EmailService.getInstance().sendEmail(
            buyerEmail,
            '[MOVIE NIGHT] Your tickets',
            plainText,
            html,
            [new Attachment({
                content: qrCode,
                filename: 'qr-code.png',
                type: 'image/png',
                disposition: 'inline',
                contentId: qrCodeCID
            })]
        );
        res.status(201).json(savedBookings);
    } catch (error) {
        createRouteErrorResponse(error, req, res);
    }
};
