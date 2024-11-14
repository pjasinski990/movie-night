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
        <div className={'flex flex-col items-center'}>
            <h2 className="text-xl text-white">Select Your Seats</h2>
            <div className="relative">
                <img src={'/seat_select.gif'} alt={'seat selection background'} className={'h-[400px]'}/>
                {seats.map((seat) => {
                    const positionStyles = getSeatPosition(seat.label);
                    return (
                        <button
                            key={seat.id}
                            onClick={() => handleSelectSeat(seat.id)}
                            className={`absolute seat ${seat.booking ? 'unavailable' : 'available'} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
                            style={positionStyles}
                            disabled={!seat.isAvailable}
                        >
                            {seat.label}
                        </button>
                    );
                })}
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

function getSeatPosition(label: string): { top: string; left: string } {
    if (!['C1', 'C2', 'C3', 'F1'].includes(label)) {
        throw new Error(`Invalid seat label received: ${label}`)
    }

    const positions: { [key: string]: { top: string; left: string } } = {
        'C1': { top: '155px', left: '145px' },
        'C2': { top: '180px', left: '116px' },
        'C3': { top: '210px', left: '70px' },
        'F1': { top: '284px', left: '130px' },
    };
    return positions[label as 'C1' | 'C2' | 'C3' | 'F1'];
}

