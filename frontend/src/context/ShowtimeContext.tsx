import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Showtime } from "../lib/models/showtime.ts";
import { deleteShowtime, fetchShowtimes } from "../lib/backendService.ts";

export interface ShowtimeContextType {
    showtimes: Showtime[];
    setShowtimes: (showtimes: Showtime[]) => void;
    deleteShowtime: (id: number) => Promise<Showtime>;
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
        fetchShowtimes().then(showtimes => {
            setShowtimes(showtimes)
            setIsLoading(false);
        });
    }, []);

    const handleDeleteShowtime = useCallback(async (id: number): Promise<Showtime> => {
        return deleteShowtime(id).then((res: Showtime) => {
            setShowtimes(showtimes.filter(id => id !== id));
            return res
        })
    }, [showtimes])

    return (
        <ShowtimeContext.Provider
            value={{
                showtimes,
                setShowtimes,
                deleteShowtime: handleDeleteShowtime,
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
