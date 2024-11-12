import React from 'react';
import { useShowtimes } from "../context/ShowtimeContext.tsx";

export const ShowtimePage: React.FC = () => {
    const { showtimes, setShowtimes, isLoading } = useShowtimes();

    return (
        <div className="content-card">
            <h1 className="self-center text-3xl font-bold underline mb-6">Movies</h1>
            {isLoading ? (
                <p className={'text-white'}>Loading movies...</p>
            ) : (
                <ul className="flex flex-col gap-6">
                    {showtimes.map((showtime) => (
                        <li key={showtime.id} className="w-full">
                            <p>{showtime.movie.title} {showtime.show_date.toISOString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
