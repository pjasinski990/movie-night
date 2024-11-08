import { Router } from 'express';
import { getMovies, createMovie } from '../controllers/moviesController';

export const moviesRoutes = Router();

moviesRoutes.get('/', getMovies);
moviesRoutes.post('/', createMovie);
