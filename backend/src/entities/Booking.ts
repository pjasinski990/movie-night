import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Buyer } from './Buyer';
import { Showtime } from './Showtime';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Buyer, (buyer) => buyer.bookings)
    buyer!: Buyer;

    @ManyToOne(() => Showtime, (showtime) => showtime.bookings)
    showtime!: Showtime;

    @CreateDateColumn()
    booked_at!: Date;
}
