import { Showtime } from "./showtime.ts";

export interface Movie {
    id?: number;
    title?: string;
    year?: number;
    description?: string;
    sellMeThisMovie?: string;
    duration?: number;
    posterUrl?: string;
    showtimes?: Showtime[]
}
