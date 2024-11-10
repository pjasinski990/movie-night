import { Movie } from "./models/movie.ts";

export async function getMovies(): Promise<Movie[]> {
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
