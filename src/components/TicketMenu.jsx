import React, { useState } from 'react';
import Button from './Button';
import ScaleLoader from 'react-spinners/ScaleLoader'

const TicketMenu = ({ isLoading, back, tickets, onClick, onClickReservation }) => {
    // State to keep track of the starting index of the visible tickets
    const [startIndex, setStartIndex] = useState(0);
    const visibleTicketCount = 5; // Number of tickets to display at once

    // Function to go to the next set of tickets
    const handleNext = () => {
        setStartIndex(prevIndex => {
            let nextIndex = prevIndex + visibleTicketCount;
            if (nextIndex >= tickets.length) return prevIndex; // Don't update if it's the end
            return nextIndex;
        });
    };

    // Function to go to the previous set of tickets
    const handlePrev = () => {
        setStartIndex(prevIndex => {
            let prevIndexNew = prevIndex - visibleTicketCount;
            if (prevIndexNew < 0) return 0; // Stay at 0 if attempting to go negative
            return prevIndexNew;
        });
    };

    // Calculate the tickets to display
    const displayedTickets = tickets.slice(startIndex, startIndex + visibleTicketCount);

    return (
        <div className='d-flex m-1 bg-transparent'>
            <Button className={'btn btn-danger col-1 m-0 me-1'} onClick={back}>
                Back
            </Button>
            <div className='d-flex flex-grow-1 justify-content-center'>
                <Button className={'btn btn-secondary col-1 m-0 me-1'} onClick={handlePrev}>Prev</Button>
                {
                    isLoading ?
                    <ScaleLoader className='d-flex justify-content-center align-items-center w-75' color='#61BDFB'/>
                    :
                    <div className='d-flex w-75 justify-content-start'>
                        {displayedTickets.map(ticket => (
                            <Button className={'ticket-btn btn btn-primary text-truncate m-0 me-1'} onClick={() => onClick(ticket)}>
                                <div className='fs-5'>{ticket.category}</div>
                                <div>{ticket.price}</div>
                            </Button>
                        ))}
                    </div>
                }
                <Button className={'btn btn-secondary col-1 m-0 ms-0'} onClick={handleNext}>Next</Button>
            </div>
            <Button className={'btn btn-primary reservation-btn'} onClick={() => onClickReservation()}>Save Reservation</Button>
        </div>
    );
}

export default TicketMenu;
