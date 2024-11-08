import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Showtime } from './Showtime';

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ nullable: true })
    description!: string;

    @Column({ nullable: true })
    duration!: number;

    @OneToMany(() => Showtime, (showtime) => showtime.movie)
    showtimes!: Showtime[];
}
