import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from './Booking';

@Entity()
export class Buyer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    email!: string;

    @OneToMany(() => Booking, (booking) => booking.buyer)
    bookings!: Booking[];
}
