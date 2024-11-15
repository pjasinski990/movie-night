import { Booking } from "./booking.ts";
import { Showtime } from "./showtime.ts";

export interface Seat {
    id: number;
    label: string;
    showtime: Showtime;
    booking?: Booking;
}
