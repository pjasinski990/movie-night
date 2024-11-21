import React from "react";
import { Movie } from "../lib/models/movie.ts";
import { X } from "lucide-react";
import '../styles/MovieCard.css';

export const MovieCard: React.FC<{ movie: Movie; onDelete: (id?: number) => void }> = ({ movie, onDelete }) => {
    return (
        <div className='movie-card movie-card-border movie-card-animation'>
            <div className='relative'>
                <button
                    className="delete-button"
                    onClick={() => onDelete(movie.id)}
                    aria-label="Delete movie"
                >
                    <X className="icon" />
                </button>
                <img
                    src={movie.posterUrl}
                    alt={`${movie.title} poster`}
                    className="movie-poster float-right sm:float-start ml-4 sm:ml-0 sm:mr-4 max-w-s"
                />
                <h2 className="text-2xl font-semibold">{movie.title}</h2>
                <h3 className="text-lg font-semibold mb-2">{movie.year}</h3>
                <p className="text-sm sm:text-base">{movie.description}</p>
            </div>
        </div>
    );
};
