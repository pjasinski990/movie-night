import { Request, Response } from 'express';
import { Movie } from '../entities/Movie';
import { AppDataSource } from "../database";
import { createRouteErrorResponse } from "../util";

export const getMovies = async (req: Request, res: Response) => {
    try {
        const movies = await AppDataSource.getRepository(Movie).find();
        res.json(movies);
    } catch (error) {
        createRouteErrorResponse(error, req, res);
    }
};

export const createMovie = async (req: Request, res: Response) => {
    try {
        const movie = AppDataSource.getRepository(Movie).create(req.body);
        const result = await AppDataSource.getRepository(Movie).save(movie);
        res.status(201).json(result);
    } catch (error) {
        createRouteErrorResponse(error, req, res);
    }
};
