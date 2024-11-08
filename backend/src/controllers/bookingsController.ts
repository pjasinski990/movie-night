import { Request, Response } from 'express';
import { Buyer } from '../entities/Buyer';
import { Booking } from '../entities/Booking';
import { Showtime } from '../entities/Showtime';
import nodemailer from 'nodemailer';
import { AppDataSource } from "../database";
import { createRouteErrorResponse } from "../util";

export const createBooking = async (req: Request, res: Response) => {
    try {
        const { showtime_id } = req.body;
        const showtimeIdNumber = typeof showtime_id === 'string' ? parseInt(showtime_id, 10) : undefined;
        const where = showtimeIdNumber ? { movie: { id: showtimeIdNumber } } : {};
        const showtime = await AppDataSource.getRepository(Showtime).findOne({ where, relations: ['movie'] });
        if (!showtime) {
            res.status(404).json({ message: 'Showtime not found' });
            return
        }

        const buyerRepo = AppDataSource.getRepository(Buyer);
        let buyer = await buyerRepo.findOne({ where: { email: req.body.email } });
        if (!buyer) {
            buyer = buyerRepo.create({ name: req.body.name, email: req.body.email });
            await buyerRepo.save(buyer);
        }

        const booking = AppDataSource.getRepository(Booking).create({
            buyer,
            showtime,
        });
        const result = await AppDataSource.getRepository(Booking).save(booking);

        sendEmailNotification(buyer, showtime);
        res.status(201).json({ message: 'Booking successful', booking: result });
    } catch (error) {
        createRouteErrorResponse(error, req, res);
    }
};

export const getBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await AppDataSource.getRepository(Booking).find({ relations: ['buyer', 'showtime', 'showtime.movie'] });
        res.json(bookings);
    } catch (error) {
        createRouteErrorResponse(error, req, res);
    }
};

function sendEmailNotification(buyer: Buyer, showtime: Showtime) {
    const transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
            user: 'apikey',
            pass: process.env.SENDGRID_API_KEY,
        },
    });

    const mailOptions = {
        from: 'your_email@example.com',
        to: 'admin_email@example.com',
        subject: 'New Ticket Booking',
        text: `${buyer.name} has booked a ticket for "${showtime.movie.title}" on ${showtime.show_date}`,
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.error('Email failed to send:', error);
        }
    });
}
