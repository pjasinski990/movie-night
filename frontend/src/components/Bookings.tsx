import React, { useState } from 'react';

export const Bookings: React.FC = () => {
    const [movieId, setMovieId] = useState('');
    const [showtimeId, setShowtimeId] = useState('');

    const handleBooking = () => {
        fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ movieId, showtimeId }),
        })
            .then((res) => res.json())
            .then(() => {
                alert('Booking successful!');
                setMovieId('');
                setShowtimeId('');
            });
    };

    return (
        <div className="content-card">
            <h1 className="text-3xl font-bold text-amber-500 mb-6">Book a Ticket</h1>
            <input
                type="text"
                placeholder="Movie ID"
                value={movieId}
                onChange={(e) => setMovieId(e.target.value)}
                className="w-full mb-4 p-3 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
                type="text"
                placeholder="Showtime ID"
                value={showtimeId}
                onChange={(e) => setShowtimeId(e.target.value)}
                className="w-full mb-6 p-3 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
                onClick={handleBooking}
                className="w-full bg-amber-500 text-black py-3 rounded-lg shadow-lg hover:bg-amber-600 transition-colors font-semibold"
            >
                Book Now
            </button>
        </div>
    );
};
