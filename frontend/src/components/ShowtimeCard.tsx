import React, { useState } from 'react';
import { Showtime } from '../lib/models/showtime.ts';
import { SeatSelection } from './SeatSelection.tsx';
import '../styles/SeatSelection.css';
import '../styles/ShowtimeCard.css'
import { getReadableTime } from "../lib/util.ts";
import { ChevronDown, X } from "lucide-react";
import { useShowtimes } from "../context/ShowtimeContext.tsx";
import { toast } from "react-toastify";
import { ConfirmDialog } from "../dialog/ConfirmDialog.tsx";

interface ShowtimeCardProps {
    showtime: Showtime;
}

export const ShowtimeCard: React.FC<ShowtimeCardProps> = ({ showtime }) => {
    const [isSelectingSeats, setIsSelectingSeats] = useState(false);
    const [deletingShowtimeId, setDeletingShowtimeId] = useState<number | undefined>(undefined);

    const { showtimes, setShowtimes, deleteShowtime } = useShowtimes()

    const showDate = new Date(showtime.show_date);
    const formattedTime = getReadableTime(showDate)

    const handleDeleteShowtime = (id?: number) => {
        if (!id) {
            console.error(`Trying to delete showtime ${id} but available showtimes are ${showtimes}`)
            return
        }
        deleteShowtime(id)
            .then(() => {
                toast.success('Showtime deleted successfully')
                setShowtimes(showtimes.filter(showtime => showtime.id !== id))
            })
            .catch((error) => {
                if (error instanceof Error) {
                    toast.error(error.message)
                }
                console.error(error)
            })
    }

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
                        <ChevronDown className={`ml-2 w-10 transition-transform duration-300 ${isSelectingSeats ? 'rotate-180' : ''}`}/>
                        <button
                            className="showtime-delete-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setDeletingShowtimeId(showtime.id);
                            }}
                            aria-label="Delete movie"
                        >
                            <X className="icon"/>
                        </button>
                    </div>
                </button>
            </div>

            <div
                className={`cursor-default transition-all duration-300 ease-in-out overflow-hidden ${
                    isSelectingSeats ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <SeatSelection showtimeId={showtime.id} />
            </div>
            <ConfirmDialog
                open={!!deletingShowtimeId}
                title={'Confirmation'}
                message={`Delete showtime?`}
                onCancel={() => setDeletingShowtimeId(undefined)}
                onConfirm={() => handleDeleteShowtime(deletingShowtimeId)}
            />
        </div>
    );
};
