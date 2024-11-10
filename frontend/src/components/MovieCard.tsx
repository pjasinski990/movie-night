import React from "react";
import { Movie } from "../lib/models/movie.ts";
import { X } from "lucide-react";
import '../styles/MovieCard.css';

export const MovieCard: React.FC<{ movie: Movie; onDelete: (id?: number) => void }> = ({ movie, onDelete }) => {
    console.log(movie)
    return (
        <div className='movie-card movie-card-border movie-card-animation'>
            <div className={'flex flex-row space-x-4'}>
                <img src={movie.posterUrl} alt={`${movie.title} poster`} className="movie-poster"/>
                <div className={'flex flex-col space-x-4'}>
                    <button
                        className="delete-button"
                        onClick={() => onDelete(movie.id)}
                        aria-label="Delete movie"
                    >
                        <X className="icon"/>
                    </button>
                    <h2 className="text-2xl font-semibold">{movie.title}</h2>
                    <h3 className="text-l font-semibold mb-2">{movie.year}</h3>
                    <p>{movie.description}</p>
                </div>
            </div>
        </div>
    );
};
