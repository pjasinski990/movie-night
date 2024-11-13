import { Router } from 'express';
import { getMovies, createMovie, deleteMovie } from '../controllers/movieController';

export const movieRoutes = Router();

movieRoutes.get('/', getMovies);
movieRoutes.post('/', createMovie);
movieRoutes.delete('/', deleteMovie);
