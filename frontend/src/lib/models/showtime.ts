import { Movie } from "./movie.ts";
import { Booking } from "./booking.ts";

export interface Showtime {
    id: number;
    show_date: Date;
    movie: Movie;
    bookings: Booking[];
}