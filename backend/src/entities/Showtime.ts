import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Movie } from './Movie';
import { Booking } from './Booking';

@Entity()
export class Showtime {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    show_date!: Date;

    @ManyToOne(() => Movie, (movie) => movie.showtimes)
    movie!: Movie;

    @OneToMany(() => Booking, (booking) => booking.showtime)
    bookings!: Booking[];
}
