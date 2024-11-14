import { Booking } from "./booking.ts";

export interface Seat {
    id: number;
    label: string;
    isAvailable: boolean;
    booking: Booking;
}
