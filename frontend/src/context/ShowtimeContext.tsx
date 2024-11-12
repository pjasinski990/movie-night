import React, { createContext, useContext, useEffect, useState } from 'react';
import { Showtime } from "../lib/models/showtime.ts";
import { getShowtimes } from "../lib/backendService.ts";

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
        <ShowtimeContext.Provider
            value={{
                showtimes,
                setShowtimes,
                isLoading,
            }}
        >
            {children}
        </ShowtimeContext.Provider>
    );
};

export const useShowtimes = () => {
    const context = useContext(ShowtimeContext);
    if (context === undefined) {
        throw new Error('useShowtimes must be used within a ShowtimeContext');
    }
    return context;
};
