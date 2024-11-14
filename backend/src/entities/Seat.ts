import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Showtime } from './Showtime';
import { Booking } from './Booking';

@Entity()
export class Seat {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    label!: string;

    @ManyToOne(() => Showtime, (showtime) => showtime.seats, { onDelete: 'CASCADE' })
    showtime!: Showtime;

    @OneToOne(() => Booking, (booking) => booking.seat)
    booking!: Booking;
}
