import { Booking } from "./booking.ts";

export interface Buyer {
    id: number;
    email: string;
    bookings: Booking[];
}
