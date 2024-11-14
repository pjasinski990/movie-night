import React, { useEffect, useState } from 'react';
import { Seat } from '../lib/models/seat.ts';
import { fetchSeats } from "../lib/backendService.ts";

interface SeatSelectionProps {
    showtimeId: number;
}

export const SeatSelection: React.FC<SeatSelectionProps> = ({ showtimeId }) => {
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [seats, setSeats] = useState<Seat[]>([]);

    useEffect(() => {
        fetchSeats(showtimeId).then(seats => setSeats(seats));
    }, [showtimeId]);

    const handleSelectSeat = (seatId: number) => {
        setSelectedSeats(prevSelected =>
            prevSelected.includes(seatId)
                ? prevSelected.filter(id => id !== seatId)
                : [...prevSelected, seatId]
        );
    };

    const handleConfirmSeats = () => {
        // TODO handle seat confirmation
    };

    return (
        <div className="seat-selection">
            <h2 className="text-xl text-white mb-4">Select Your Seats</h2>
            <div className="seat-map">
                {seats.map(seat => (
                    <button
                        key={seat.id}
                        onClick={() => handleSelectSeat(seat.id)}
                        className={`seat ${seat.booking ? 'unavailable' : 'available'} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
                        disabled={!seat.isAvailable}
                    >
                        {seat.label}
                    </button>
                ))}
            </div>
            <button
                onClick={handleConfirmSeats}
                className="confirm-button"
                disabled={selectedSeats.length === 0}
            >
                Confirm Seats
            </button>
        </div>
    );
};
