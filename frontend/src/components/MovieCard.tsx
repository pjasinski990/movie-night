import React from "react";
import { Movie } from "../lib/models/movie.ts";
import { X } from "lucide-react";
import '../styles/MovieCard.css';

export const MovieCard: React.FC<{ movie: Movie; onDelete: (id?: number) => void }> = ({ movie, onDelete }) => {
    return (
        <div className='movie-card movie-card-border movie-card-animation'>
            <div className='relative w-full h-full'>
                <button
                    className="delete-button"
                    onClick={() => onDelete(movie.id)}
                    aria-label="Delete movie"
                >
                    <X className="icon"/>
                </button>
                <img
                    src={movie.posterUrl}
                    alt={`${movie.title} poster`}
                    className="movie-poster float-end sm:float-start ml-4 sm:ml-0 sm:mr-4 max-w-s"
                />
                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold">{movie.title} ({movie.year})</h2>
                    <h3 className="text-sm sm:text-md font-semibold mb-2">Runtime: {movie.duration}m</h3>
                    <p className="text-sm sm:text-base">{movie.description}</p>
                    <p className="text-sm sm:text-base pt-4 text-white">{movie.sellMeThisMovie}</p>
                </div>
            </div>
        </div>
    );
};
