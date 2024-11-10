import { Booking } from "./booking.ts";

export interface Buyer {
    id: number;
    name: string;
    email: string;
    bookings: Booking[];
}
