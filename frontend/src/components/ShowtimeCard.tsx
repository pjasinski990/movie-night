import React, { useState } from 'react';
import { Showtime } from '../lib/models/showtime.ts';
import { SeatSelection } from './SeatSelection.tsx';
import '../styles/SeatSelection.css';
import { getReadableDate, getReadableTime } from "../lib/util.ts";

interface ShowtimeCardProps {
    showtime: Showtime;
}

export const ShowtimeCard: React.FC<ShowtimeCardProps> = ({ showtime }) => {
    const [isSelectingSeats, setIsSelectingSeats] = useState(false);

    const showDate = new Date(showtime.show_date);
    const formattedDate = getReadableDate(showDate)
    const formattedTime = getReadableTime(showDate)
    const formattedDateTime = `${formattedDate} ${formattedTime}`;

    const handleSelectShowtime = () => {
        setIsSelectingSeats(true);
    };

    if (!showtime.id) {
        console.error(`Trying to render showtime without id: ${JSON.stringify(showtime)}`)
        return
    }

    return (
        <div className='showtime-card'>
            {!isSelectingSeats ? (
                <>
                    <h2 className="text-2xl font-semibold">{showtime.movie.title}</h2>
                    <p className="text-l font-semibold mb-2">{formattedDateTime}</p>
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
