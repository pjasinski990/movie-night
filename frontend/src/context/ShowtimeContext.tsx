import React, { createContext, useContext, useEffect, useState } from 'react';
import { getMovies } from "../lib/backendService.ts";
import { Showtime } from "../lib/models/showtime.ts";

export interface ShowtimeContextType {
    showtimes: Showtime[];
    setShowtimes: (showtimes: Showtime[]) => void;
    isLoading: boolean;
}

export const ShowtimeContext = createContext<ShowtimeContextType | undefined>(
    undefined
);

export const ShowtimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [showtimes, setShowtimes] = useState<Showtime[]>([]);

    useEffect(() => {
        setIsLoading(true);
        getShowtimes().then(showtimes => {
            setShowtimes(showtimes)
            setIsLoading(false);
        });
    }, []);

    return (
        <MovieContext.Provider
            value={{
                movies,
                setMovies,
                isLoading,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};

export const useMovies = () => {
    const context = useContext(MovieContext);
    if (context === undefined) {
        throw new Error('useMovies must be used within an MovieProvider');
    }
    return context;
};
