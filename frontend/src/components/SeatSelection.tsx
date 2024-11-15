import React, { useEffect, useState } from 'react';
import { Seat } from '../lib/models/seat.ts';
import { bookSeats, fetchSeats } from "../lib/backendService.ts";
import { toast } from "react-toastify";
import { Booking } from "../lib/models/booking.ts";

interface SeatSelectionProps {
    showtimeId: number;
}

export const SeatSelection: React.FC<SeatSelectionProps> = ({ showtimeId }) => {
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [buyerName, setBuyerName] = useState('');
    const [buyerEmail, setBuyerEmail] = useState('');
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

    const applyBookingToSeat = (booking: Booking) => {
        const takenSeat = seats.find(seat => seat.id === booking.seat.id)
        if (!takenSeat) {
            throw new Error(`Invalid booking ${booking} for available seats ${seats}`)
        }

        const updatedSeat = {...takenSeat, booking: booking};
        setSeats(seats.map(seat =>
            seat.id === updatedSeat.id ? updatedSeat : seat
        ));
    }

    const handleConfirmSeats = async () => {
        if (!buyerName) {
            toast.error('Name is required')
            return
        } else if (!buyerEmail) {
            toast.error('Email is required')
            return
        }

        try {
            const bookings = await bookSeats(buyerName, buyerEmail, selectedSeats);
            for (const booking of bookings) {
                toast.success(`Successfully booked seat ${booking.seat.label}`);
            }

            setSelectedSeats([])
            setBuyerName('')
            setBuyerEmail('')
            for (const booking of bookings) {
                applyBookingToSeat(booking);
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
            console.error(error);
        }
    };

    return (
        <div className={'flex flex-col items-center'}>
            <h2 className="text-xl text-white">Select Your Seats</h2>
            <div className="relative">
                <img src={'/seat_select.gif'} alt={'seat selection background'} className={'h-[400px]'} />
                {seats.map((seat) => {
                    const positionStyles = getSeatPosition(seat.label);
                    return (
                        <button
                            key={seat.id}
                            onClick={() => {
                                handleSelectSeat(seat.id)}}
                            className={`absolute seat ${seat.booking ? 'unavailable' : 'available'} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
                            style={positionStyles}
                            disabled={!!seat.booking}
                        >
                            {seat.label}
                        </button>
                    );
                })}
            </div>
            <div className={'flex flex-col items-center w-64 mt-[-12px]'}>
                <input
                    className={'seat-form-input mb-2'}
                    placeholder={'Your name'}
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                />
                <input
                    className={'seat-form-input mb-4'}
                    placeholder={'Your email'}
                    inputMode={'email'}
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                />
                <button
                    onClick={handleConfirmSeats}
                    className="confirm-button mb-8"
                    disabled={selectedSeats.length === 0}
                >
                    Confirm Seats
                </button>
            </div>
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

