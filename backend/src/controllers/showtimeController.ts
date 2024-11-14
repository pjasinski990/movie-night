import { Request, Response } from 'express';
import { Showtime } from '../entities/Showtime';
import { Movie } from '../entities/Movie';
import { AppDataSource } from "../database";
import { createRouteErrorResponse, generateSeatLabels } from "../util";
import { Seat } from "../entities/Seat";

export const getShowtimes = async (req: Request, res: Response) => {
    try {
        const { movie_id } = req.query;
        const movieIdNumber = typeof movie_id === 'string' ? parseInt(movie_id, 10) : undefined;
        const where = movieIdNumber ? { movie: { id: movieIdNumber } } : {};
        const showtimes = await AppDataSource.getRepository(Showtime).find({ where, relations: ['movie'] });
        res.json(showtimes);
    } catch (error) {
        createRouteErrorResponse(error, req, res);
    }
};

export const createShowtime = async (req: Request, res: Response) => {
    try {
        const movie = await AppDataSource.getRepository(Movie).findOne({ where: { id: req.body.movie.id } });
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' });
            return
        }

        const showtime = AppDataSource.getRepository(Showtime).create({
            show_date: req.body.show_date,
            movie,
        });

        const savedShowtime = await AppDataSource.getRepository(Showtime).save(showtime);

        const seatRepository = AppDataSource.getRepository(Seat);
        const seats: Seat[] = [];

        for (const seatLabel of generateSeatLabels()) {
            const seat = seatRepository.create({
                label: seatLabel,
                showtime: savedShowtime,
            });
            seats.push(seat);
        }
        await seatRepository.save(seats);

        res.status(201).json(savedShowtime);
    } catch (error) {
        createRouteErrorResponse(error, req, res);
    }
};

export const deleteShowtime = async (req: Request, res: Response) => {
    try {
        const showtimeRepository = AppDataSource.getRepository(Showtime);
        const toDelete = await showtimeRepository.findOne({ where: { id: req.body.id } });

        if (!toDelete) {
            res.status(404)
            return
        }

        await showtimeRepository.delete({ id: req.body.id });
        res.status(200).json(toDelete);
    } catch (error) {
        createRouteErrorResponse(error, req, res);
    }
};

export const getSeatsForShowtime = async (req: Request, res: Response) => {
    try {
        const showtimeId = parseInt(req.params.id, 10);

        const showtime = await AppDataSource.getRepository(Showtime).findOne({
            where: { id: showtimeId },
            relations: ['seats', 'seats.bookings'],
        });

        if (!showtime) {
            res.status(404).json({ message: 'Showtime not found' });
            return
        }

        res.json(showtime.seats);
    } catch (error) {
        createRouteErrorResponse(error, req, res);
    }
};
