import { Movie } from "./models/movie.ts";
import { Showtime } from "./models/showtime.ts";
import { Seat } from "./models/seat.ts";

export async function fetchMovies(): Promise<Movie[]> {
    return await fetch('/api/movies')
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        .catch((err) => {
            console.log(err)
        });
}

export async function postMovie(movie: Movie): Promise<Movie> {
    let res = await fetch('/api/movies', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(movie),
    });
    return await res.json();
}

export async function deleteMovie(movieId: number): Promise<Movie> {
    let res = await fetch('/api/movies', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ id: movieId }),
    });
    if (res.status >= 400) {
        throw new Error(res.statusText);
    }
    return await res.json();
}

export async function fetchShowtimes(): Promise<Showtime[]> {
    return await fetch('/api/showtimes')
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        .catch((err) => {
            console.log(err)
        });
}

export async function postShowtime(showtime: Showtime): Promise<Showtime> {
    let res = await fetch('/api/showtimes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(showtime),
    });
    return await res.json();
}

export async function deleteShowtime(showtimeId: number): Promise<Showtime> {
    let res = await fetch('/api/showtimes', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ id: showtimeId }),
    });
    if (res.status >= 400) {
        throw new Error(res.statusText);
    }
    return await res.json();
}

export const fetchSeats = async (showtimeId: number): Promise<Seat[]> => {
    return await fetch(`/api/showtimes/${showtimeId}/seats`)
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        .catch((err) => {
            console.log(err)
        });
};
