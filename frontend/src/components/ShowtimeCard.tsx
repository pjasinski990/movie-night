import React, { useState } from 'react';
import { Showtime } from '../lib/models/showtime.ts';
import { SeatSelection } from './SeatSelection.tsx';
import '../styles/SeatSelection.css';

interface ShowtimeCardProps {
    showtime: Showtime;
}

export const ShowtimeCard: React.FC<ShowtimeCardProps> = ({ showtime }) => {
    const [isSelectingSeats, setIsSelectingSeats] = useState(false);

    const showDate = new Date(showtime.show_date);
    const formattedTime = showDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const handleSelectShowtime = () => {
        setIsSelectingSeats(true);
    };

    return (
        <div className='showtime-card'>
            {!isSelectingSeats ? (
                <>
                    <h2 className="text-2xl font-semibold">{showtime.movie.title}</h2>
                    <p className="text-l font-semibold mb-2">{formattedTime}</p>
                    <button
                        onClick={handleSelectShowtime}
                        className="select-button"
                    >
                        Select Seats
                    </button>
                </>
            ) : (
                <SeatSelection showtimeId={showtime.id} />
            )}
        </div>
    );
};
