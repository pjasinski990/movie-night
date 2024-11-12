import React, { useEffect, useState } from 'react';
import { MovieCard } from "./MovieCard.tsx";
import { MovieForm } from "./MovieForm.tsx";

interface Showtime {
    id: number;
    movieId: number;
    time: string;
}

export const ShowtimePage: React.FC = () => {
    const [showtimes, setShowtimes] = useState<Showtime[]>([]);

    useEffect(() => {
        fetch('/api/showtimes')
            .then((res) => res.json())
            .then((data) => setShowtimes(data));
    }, []);

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
