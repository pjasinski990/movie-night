import { Buyer } from "./buyer.ts";
import { Seat } from "./seat.ts";
import { Showtime } from "./showtime.ts";

export interface Booking {
    id: number;
    buyer: Buyer;
    showtime: Showtime;
    seat: Seat;
}
