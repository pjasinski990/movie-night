import React, { useState } from 'react';
import { deleteMovie } from "../lib/backendService.ts";
import { MovieProvider, useMovies } from "../context/MovieContext.tsx";
import { toast } from "react-toastify";
import { MovieCard } from "./MovieCard.tsx";
import '../styles/MovieForm.css'
import { MovieForm } from "./MovieForm.tsx";
import { ConfirmDialog } from "../dialog/ConfirmDialog.tsx";

export const MoviePage: React.FC = () => {
    return (
        <MovieProvider>
            <div className="content-card">
                <Movies/>
            </div>
        </MovieProvider>
)
}

const Movies: React.FC = () => {
    const [deletingMovieId, setDeletingMovieId] = useState<number | undefined>(undefined)
    const { movies, setMovies, isLoading } = useMovies();

    const handleDeleteMovie = async (id?: number) => {
        try {
            if (!id) {
                toast.error('Movie not found');
                return;
            }
            const deleted = await deleteMovie(id);
            setMovies(movies.filter(movie => movie.id !== deleted.id))
            setDeletingMovieId(undefined)
            toast.success(`Deleted movie ${deleted.title}`);
        } catch (error) {
            toast.error(`${error}`)
        }
    }

    return (
        <div className={'flex flex-col'}>
            <h1 className="self-center text-3xl font-bold underline mb-6">Showing</h1>
            {isLoading ? (
                <p className={'text-white'}>Loading movies...</p>
            ) : (
                <ul className="flex flex-col gap-6">
                    {movies.map((movie) => (
                        <li key={movie.id} className="w-full">
                            <MovieCard movie={movie} onDelete={(id) => setDeletingMovieId(id)}/>
                        </li>
                    ))}
                </ul>
            )}
            <MovieForm/>
            <ConfirmDialog
                open={!!deletingMovieId}
                title={'Confirmation'}
                message={`Delete movie?`}
                onCancel={() => setDeletingMovieId(undefined)}
                onConfirm={() => handleDeleteMovie(deletingMovieId)}
            />
        </div>
    );
};
