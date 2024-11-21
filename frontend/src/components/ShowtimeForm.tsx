import React, { useEffect, useRef, useState } from "react";
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
    const [time, setTime] = useState('00:00')
    const [movie, setMovie] = useState<Movie | undefined>(undefined)
    const [folded, setFolded] = useState(true);
    const contentRef = useRef<HTMLDivElement>(null);

    const { showtimes, setShowtimes } = useShowtimes()

    useEffect(() => {
        if (!folded && contentRef.current) {
            const observer = new ResizeObserver(() => {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth',
                });
            });

            observer.observe(contentRef.current);

            return () => observer.disconnect();
        }
    }, [folded]);

    const clearForm = () => {
        setDateTime(null);
        setTime('00:00');
        setMovie(undefined);
    };

    const handleTimeChange = (timeValue: string | null) => {
        if (!dateTime || !timeValue) {
            return;
        }
        const [hours, minutes] = timeValue.split(':').map(Number);
        const newDateTime = new Date(dateTime.getTime());
        newDateTime.setHours(hours);
        newDateTime.setMinutes(minutes);
        setDateTime(newDateTime);
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
                <h2 className={`text-xl font-semibold text-white`}>I'm on a tight schedule...</h2>
                <ChevronDown
                    className={`w-10 transition-transform duration-300 ${folded ? '' : 'rotate-180'}`}
                />
            </div>

            <div
                ref={contentRef}
                className={`transition-all duration-300 ease-in-out overflow-hidden ${folded ? 'max-h-0 opacity-0' : 'max-h-screen opacity-100'}`}
            >
                <div className="p-4 pt-0 flex flex-col space-y-8">
                    <div className="md:h-[382px]">
                        <div className="flex flex-col-reverse md:flex-row items-stretch space-x-3 h-full">
                            <div className={'flex flex-col items-center'}>
                                <div className="flex flex-col items-center w-fit">
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
                                        locale={navigator.language}
                                        className="showtime-form-time-picker w-full mt-4 text-xl"
                                    />
                                </div>
                            </div>
                            <div className="mt-2 mb-3 md:mb-0 flex-grow max-h-[320px] overflow-auto md:h-full">
                                <MovieSelector movies={movies} selectedMovie={movie} setMovie={setMovie} />
                            </div>
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

const MovieSelector: React.FC<{ movies: Movie[], selectedMovie: Movie | undefined, setMovie: React.Dispatch<React.SetStateAction<Movie | undefined>> }> = ({ movies, selectedMovie, setMovie }) => {
    return (
        <div className={'overflow-y-auto h-full mx-2'}>
            <ul className={'flex flex-col space-y-2'}>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <MovieOption
                            movie={movie}
                            isSelected={String(movie.id) === String(selectedMovie?.id)}
                            onClick={ () => setMovie(movie) }
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

const MovieOption: React.FC<{ movie: Movie, isSelected: boolean, onClick: () => void }> = ({ movie, isSelected, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`flex flex-row space-x-3 h-24 cursor-pointer mr-2 ${isSelected ? 'bg-gold text-oxford_blue-300' : 'bg-rich_black-200 hover:bg-rich_black-100 '}`}
        >
            <img src={movie.posterUrl} alt={`${movie.title} poster`} className="w-16 h-24 object-cover" />
            <div className="flex flex-col pt-2 pl-2">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <p className="text-sm">{movie.year}</p>
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
