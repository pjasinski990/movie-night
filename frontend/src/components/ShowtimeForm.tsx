import React, { useState } from "react";
import { Movie } from "../lib/models/movie.ts";
import { postShowtime } from "../lib/backendService.ts";
import { toast } from "react-toastify";
import { useShowtimes } from "../context/ShowtimeContext.tsx";
import { Showtime } from "../lib/models/showtime.ts";
import { ChevronDown } from "lucide-react";
import Calendar from 'react-calendar';
import TimePicker from "react-time-picker";
import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css'
import '../styles/ShowtimeForm.css'

export const ShowtimeForm: React.FC<{ movies: Movie[] }> = ({ movies }) => {
    const [dateTime, setDateTime] = useState<Date | null>(null);
    const [time, setTime] = useState('12:00')
    const [movie, setMovie] = useState<Movie | undefined>(undefined)
    const [folded, setFolded] = useState(true);

    const { showtimes, setShowtimes } = useShowtimes()

    const clearForm = () => {
        setDateTime(null)
        setMovie(undefined)
    }

    const handleTimeChange = (timeValue: string | null) => {
        if (!dateTime || !timeValue) {
            return
        }
        const [hours, minutes] = timeValue.split(':').map(Number);
        dateTime.setHours(hours);
        dateTime.setMinutes(minutes);
        setDateTime(dateTime);
        setTime(timeValue);
    };

    const handleAddShowtime = async () => {
        const newShowtime: Showtime = {
            show_date: dateTime!,
            movie: movie!,
            bookings: [],
        };
        try {
            validateShowtime(newShowtime);
            const res = await postShowtime(newShowtime);
            setShowtimes([...showtimes, res]);

            toast.success('Showtime added successfully');
            clearForm();
            setFolded(true);
        } catch (error: any) {
            console.error('Failed to add showtime:', error);
            toast.error(`${error}`);
        }
    };

    return (
        <div className={'showtime-form'}>
            <div
                className={`app-form-heading ${folded ? 'py-2' : 'py-4'}`}
                onClick={() => setFolded(!folded)}
            >
                <h2 className={`text-xl font-semibold text-white`}>I've got a better idea...</h2>
                <ChevronDown
                    className={`w-10 transition-transform duration-300 ${folded ? '' : 'rotate-180'}`}
                />
            </div>
            <div className={`transition-height duration-300 ${folded ? 'max-h-0 overflow-hidden' : 'max-h-screen'}`}>
                <div className="p-4 pt-0 flex flex-col space-y-8">
                    <div className="flex flex-row items-stretch space-x-3">
                        <div className="mt-2">
                            <Calendar
                                onChange={(value) => {
                                    if (Array.isArray(value)) {
                                        setDateTime(value[0]);
                                    } else {
                                        setDateTime(value);
                                    }
                                }}
                                selectRange={false}
                                value={dateTime}
                                className="showtime-form-calendar w-full mt-2"
                                minDate={new Date()}
                            />
                            <TimePicker
                                onChange={(value) => {
                                    if (Array.isArray(value)) {
                                        handleTimeChange(value[0])
                                    } else {
                                        handleTimeChange(value)
                                    }
                                }}
                                value={time}
                                format={'HH:mm'}
                                disableClock={true}
                                className="showtime-form-time-picker w-full mt-4 text-xl"
                            />
                        </div>
                        <div className="mt-2">
                            <MovieSelector movies={movies} />
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            handleAddShowtime().then()
                        }}
                        className="app-form-submit-button w-full"
                    >
                        Add Showtime
                    </button>
                </div>
            </div>
        </div>
    )
}

function validateShowtime(showtime: Showtime) {
    if (!showtime.show_date || isNaN(showtime.show_date.getTime())) {
        throw 'Showtime requires a valid date and time';
    } else if (!showtime.movie) {
        throw 'Showtime requires a movie';
    }
}

const MovieSelector: React.FC<{ movies: Movie[] }> = ({ movies }) => {
    return (
        <div className={'overflow-y-auto m-2'}>
            <ul className={'flex flex-col space-y-4'}>
                {movies.map(movie => (
                <li>
                    <MovieOption movie={movie} />
                </li>
                ))}
            </ul>
        </div>
    )
}

const MovieOption: React.FC<{ movie: Movie }> = ({ movie }) => {
    return (
        <div className={'flex flex-row space-x-3 h-24'}>
            <img src={movie.posterUrl} alt={`${movie.title} poster`} />
        </div>
    )
}
