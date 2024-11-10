import React, { createContext, useState, useContext, useEffect } from 'react';
import { Movie } from "../lib/models/movie.ts";
import { getMovies } from "../lib/backendService.ts";

export interface MovieContextType {
    movies: Movie[];
    setMovies: (movies: Movie[]) => void;
    isLoading: boolean;
}

export const MovieContext = createContext<MovieContextType | undefined>(
    undefined
);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        setIsLoading(true);
        getMovies().then(movies => {
            setMovies(movies)
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
