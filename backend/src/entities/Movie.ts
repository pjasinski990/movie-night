import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Showtime } from './Showtime';

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    year!: number;

    @Column()
    title!: string;

    @Column({ length: 1024, nullable: true })
    description!: string;

    @Column({ length: 1024, nullable: true })
    sellMeThisMovie!: string;

    @Column({ nullable: true })
    duration!: number;

    @Column({ length: 2083, nullable: true })
    posterUrl!: string;

    @OneToMany(() => Showtime, (showtime) => showtime.movie)
    showtimes!: Showtime[];
}
