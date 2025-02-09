import React from 'react';
import { ShowtimeProvider, useShowtimes } from "../context/ShowtimeContext.tsx";
import { MovieProvider, useMovies } from "../context/MovieContext.tsx";
import 'react-datepicker/dist/react-datepicker.css';
import { ShowtimeCard } from "./ShowtimeCard.tsx";
import { ShowtimeForm } from "./ShowtimeForm.tsx";
import { Showtime } from "../lib/models/showtime.ts";
import { aggregateBy, getReadableDate } from "../lib/util.ts";

export const ShowtimePage: React.FC = () => {
    return (
        <ShowtimeProvider>
            <MovieProvider>
                <div className={'content-card'}>
                    <ShowtimesPageContent />
                </div>
            </MovieProvider>
        </ShowtimeProvider>
    )
}

const ShowtimesPageContent: React.FC = () => {
    const { movies } = useMovies();
    const { showtimes, isLoading } = useShowtimes();

    return (
        <div className={'flex flex-col'}>
            <h1 className="self-center text-3xl font-bold underline mb-6">Showtimes</h1>
            {isLoading ? (
                    <p className={'text-white'}>Loading showtimes...</p>
                ) :
                <Showtimes showtimes={showtimes} />
            }
            <div className={'mt-4'}>
                <ShowtimeForm movies={movies} />
            </div>
        </div>
    );
};

const Showtimes: React.FC<{ showtimes: Showtime[] }> = ({ showtimes }) => {
    const upcomingShowtimes = getUpcomingShowtimesInOrder(showtimes);
    const dailyRepertoires = aggregateBy(upcomingShowtimes, (showtime: Showtime) => new Date(showtime.show_date).toLocaleDateString())

    if (Object.keys(dailyRepertoires).length === 0) {
        return (
            <p className={'text-white ml-2'}>Doesn't look like anything to me.</p>
        )
    }

    return (
        <ul className="flex flex-col gap-6">
            {Object.keys(dailyRepertoires).map((showDate) => (
                <li key={showDate} className="w-full">
                    <DailyRepertoire
                        date={new Date(dailyRepertoires[showDate][0].show_date)}
                        showtimes={dailyRepertoires[showDate]}
                    />
                </li>
            ))}
        </ul>
    )
}

const DailyRepertoire: React.FC<{ date: Date, showtimes: Showtime[] }> = ({ date, showtimes }) => {
    return (
        <div className={'flex flex-col'}>
            <h2 className={'text-2xl font-semibold text-white ml-2 mb-3'}>{getReadableDate(date)}</h2>
            <div className={''}>
                <ul>
                    {showtimes.map((showtime, index) => (
                        <React.Fragment key={showtime.id}>
                            <li>
                                <ShowtimeCard showtime={showtime} />
                            </li>
                            {index < showtimes.length - 1 && <div className={'m-2'} />}
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        </div>
    )
}

function getUpcomingShowtimesInOrder(showtimes: Showtime[]) {
    return showtimes
        .filter(showtime => {
            const showDate = new Date(showtime.show_date);
            const now = new Date();
            return showDate >= now
        })
        .sort((a, b) => new Date(a.show_date).getTime() - new Date(b.show_date).getTime());
}
