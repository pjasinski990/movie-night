import React, { useEffect, useState } from 'react';

interface Showtime {
    id: number;
    movieId: number;
    time: string;
}

export const Showtimes: React.FC = () => {
    const [showtimes, setShowtimes] = useState<Showtime[]>([]);

    useEffect(() => {
        fetch('/api/showtimes')
            .then((res) => res.json())
            .then((data) => setShowtimes(data));
    }, []);

    return (
        <div className="page-bg">
            <h1 className="text-3xl font-bold underline mb-6">Showtimes</h1>
            <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {showtimes.map((showtime) => (
                    <li
                        key={showtime.id}
                        className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                    >
                        <p className="text-gray-300 mb-2">
                            <span className="font-semibold text-white">Movie ID:</span> {showtime.movieId}
                        </p>
                        <p className="text-gray-300">
                            <span className="font-semibold text-white">Time:</span> {new Date(showtime.time).toLocaleString()}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
