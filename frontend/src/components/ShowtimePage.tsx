import React, { useState } from 'react';
import { ShowtimeProvider, useShowtimes } from "../context/ShowtimeContext.tsx";
import { MovieProvider, useMovies } from "../context/MovieContext.tsx";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ShowtimeCard } from "./ShowtimeCard.tsx";
import { postShowtime } from "../lib/backendService.ts";
import { CalendarDays } from "lucide-react";
import { ShowtimeForm } from "./ShowtimeForm.tsx";

export const ShowtimePage: React.FC = () => {
    return (
        <MovieProvider>
            <ShowtimeProvider>
                <Showtimes />
            </ShowtimeProvider>
        </MovieProvider>
    )
}

const Showtimes: React.FC = () => {
    const { movies } = useMovies()
    const { showtimes, isLoading } = useShowtimes();

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const filteredShowtimes = showtimes.filter(showtime => {
        return selectedDate
            ? new Date(showtime.show_date).toDateString() === selectedDate.toDateString()
            : true;
    });

    return (
        <div className="content-card">
            <h1 className="self-center text-3xl font-bold underline mb-6">Showtimes</h1>
            <div className="mb-4">
                <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date | null) => setSelectedDate(date)}
                    dateFormat="MMMM d, yyyy"
                    className="p-2 rounded app-form-input"
                    showIcon
                    icon={<CalendarDays />}
                />
            </div>
            {isLoading ? (
                <p className={'text-white'}>Loading showtimes...</p>
            ) : filteredShowtimes.length > 0 ? (
                <ul className="flex flex-col gap-6">
                    {filteredShowtimes.map((showtime) => (
                        <li key={showtime.id} className="w-full">
                            <ShowtimeCard showtime={showtime}/>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={'text-white'}>No showtimes available for this date. Unless..?</p>
            )}
            <ShowtimeForm movies={movies} />
        </div>
    );
};
