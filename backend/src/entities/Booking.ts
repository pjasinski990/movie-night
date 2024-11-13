import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Buyer } from './Buyer';
import { Showtime } from './Showtime';
import { Seat } from './Seat';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Buyer, (buyer) => buyer.bookings, { onDelete: 'CASCADE' })
    buyer!: Buyer;

    @ManyToOne(() => Showtime, (showtime) => showtime.bookings, { onDelete: 'CASCADE' })
    showtime!: Showtime;

    @OneToOne(() => Seat, (seat) => seat.booking, { onDelete: 'CASCADE' })
    @JoinColumn()
    seat!: Seat;
}
