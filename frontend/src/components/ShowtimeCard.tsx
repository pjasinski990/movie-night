import React, { useState } from 'react';
import { Showtime } from '../lib/models/showtime.ts';
import { SeatSelection } from './SeatSelection.tsx';
import '../styles/SeatSelection.css';
import '../styles/ShowtimeCard.css'
import { getReadableTime } from "../lib/util.ts";
import { ChevronDown } from "lucide-react";

interface ShowtimeCardProps {
    showtime: Showtime;
}

export const ShowtimeCard: React.FC<ShowtimeCardProps> = ({ showtime }) => {
    const [isSelectingSeats, setIsSelectingSeats] = useState(false);

    const showDate = new Date(showtime.show_date);
    const formattedTime = getReadableTime(showDate)

    if (!showtime.id) {
        console.error(`Trying to render showtime without id: ${JSON.stringify(showtime)}`)
        return
    }

    return (
        <div className={'showtime-card cursor-pointer'}>
            <div className={'flex flex-row p-4 justify-between items-center'} onClick={() => setIsSelectingSeats(!isSelectingSeats)}>
                <div className={'flex-col'}>
                    <h2 className={'text-2xl font-semibold'}>{showtime.movie.title}</h2>
                    <p className={'text-l font-semibold'}>{formattedTime}</p>
                </div>
                <button
                    className={'select-button'}
                >
                    <div className={'flex flex-row'}>
                        Select Seats
                        <ChevronDown className={`ml-2 w-10 transition-transform duration-300 ${isSelectingSeats ? 'rotate-180' : ''}`} />
                    </div>
                </button>
            </div>

            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isSelectingSeats ? 'max-h-[100vh] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <SeatSelection showtimeId={showtime.id} />
            </div>
        </div>
    );
};
