import React from 'react';
import { deleteMovie } from "../lib/backendService.ts";
import { MovieProvider, useMovies } from "../context/MovieContext.tsx";
import { toast } from "react-toastify";
import { MovieCard } from "./MovieCard.tsx";
import '../styles/MovieForm.css'
import { MovieForm } from "./MovieForm.tsx";

export const MoviePage: React.FC = () => {
    return (
        <MovieProvider>
            <Movies />
        </MovieProvider>
    )
}

const Movies: React.FC = () => {
    const { movies, setMovies, isLoading } = useMovies();

    const handleDeleteMovie = async (id?: number) => {
        try {
            if (!id) {
                toast.error('Movie not found');
                return;
            }
            const deleted = await deleteMovie(id);
            setMovies(movies.filter(movie => movie.id !== deleted.id))
            toast.success(`Deleted movie ${deleted.title}`);
        } catch (error) {
            toast.error(`${error}`)
        }
    }

    return (
        <div className="content-card">
            <h1 className="self-center text-3xl font-bold underline mb-6">Movies</h1>
            {isLoading ? (
                <p className={'text-white'}>Loading movies...</p>
            ) : (
                <ul className="flex flex-col gap-6">
                    {movies.map((movie) => (
                        <li key={movie.id} className="w-full">
                            <MovieCard movie={movie} onDelete={handleDeleteMovie}/>
                        </li>
                    ))}
                </ul>
            )}
            <MovieForm/>
        </div>
    );
};
