import { Router } from 'express';
import { getMovies, createMovie, deleteMovie } from '../controllers/moviesController';

export const moviesRoutes = Router();

moviesRoutes.get('/', getMovies);
moviesRoutes.post('/', createMovie);
moviesRoutes.delete('/', deleteMovie);
