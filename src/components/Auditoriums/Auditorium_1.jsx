import React, { useEffect, useState } from 'react'
import TicketMenu from '../TicketMenu';
import { HandleItemClicked, SaveTickets } from '../../calculator';

const Auditorium_1 = ({ ticketBasket, paymentMethod, movieNumber, currentAud, tickets, setCurrentAud, transactionInprogress, setTransactionInprogress, setPaymentMethod, setTicketClicked, setTicketIsClicked, setTicketBasket, setDisplayTransaction, setPrice, setAmountReceived, setChange, setBanknoteWasClicked }) => {

    const seats = document.querySelectorAll('.seat');
    const [numberOfTickets, setNumberOfTickets] = useState(0);
    const [selectedTickets, setSelectedTickets] = useState(0);
    const [soldSeats, setSoldSeats] = useState([]);
    const screeningId = `auditorium_${currentAud}_movie_${movieNumber}`;
    const [savedSeats, setSavedSeats] = useState(() => JSON.parse(localStorage.getItem(`auditorium_${currentAud}_movie_${movieNumber}`)) || []);
    const [seatsLoaded, setSeatsLoaded] = useState(false);

    useEffect(() => {
        setSeatsLoaded(true);
        seats.forEach((seat) => {
            const seatValue = seat.getAttribute('data-value');
            if (savedSeats.includes(seatValue)) {
                seat.classList.add('occupied');
            }
        })
    },[screeningId, savedSeats, seats, seatsLoaded]);

    useEffect(() => {
        localStorage.setItem(screeningId, JSON.stringify(savedSeats));
    });

    useEffect(() => {
        const totalTickets = ticketBasket.reduce((total, ticket) => total + ticket.amount, 0);
        setNumberOfTickets(totalTickets);
    }, [ticketBasket]);

    function setClicked(e) {
        const seatValue = e.target.getAttribute('data-value');
        if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved') && !e.target.classList.contains('occupied')  && !e.target.classList.contains('selected') && numberOfTickets > selectedTickets) {
            e.target.classList.toggle('selected');
            setSelectedTickets((prev) => prev + 1);
            setSoldSeats((prevSeats) => [...prevSeats, seatValue]);
        } else if (e.target.classList.contains('seat') && e.target.classList.contains('selected')) {
            e.target.classList.remove('selected');
            setSelectedTickets((prev) => prev - 1);
            setSoldSeats((prevSeats) => prevSeats.filter((seat) => seat !== seatValue));
        }
    }

    useEffect(() => {
        if (ticketBasket.length === 0) {
            seats.forEach((seat) => {
                seat.classList.remove('selected');
            })
            setSelectedTickets(0);
        }
    },[ticketBasket, seats]);

    useEffect(() => {
        if (paymentMethod !== '') {
            seats.forEach((seat) => {
                if (seat.classList.contains('selected')) {
                    seat.classList.remove('selected');
                    seat.classList.add('occupied');
                }
            })
            setSelectedTickets(0);
            setNumberOfTickets(0);
            setSavedSeats((prevSeats) => [...prevSeats, soldSeats]);
            SaveTickets(soldSeats, savedSeats);
        }
    },[paymentMethod, soldSeats]);

    console.log(soldSeats);

    function genericHandleTicketClicked(newTicket) {
        HandleItemClicked( 
            newTicket, 
            transactionInprogress, 
            paymentMethod, 
            setTransactionInprogress, 
            setPaymentMethod, 
            setTicketClicked, 
            setTicketIsClicked, 
            setTicketBasket, 
            setDisplayTransaction, 
            setPrice, 
            setAmountReceived, 
            setChange, 
            setBanknoteWasClicked
        );
        console.log('HandleItemClicked()')
    }

    return (
        <>
            <div className='d-flex flex-fill justify-content-center align-items-center bg-dark'>
                
                <div className='d-flex flex-column col-1 text-white'>
                    <div className='d-flex flex-column justify-content-center align-items-center mb-5'>
                        <div>Aud: {currentAud}</div>
                        <div>Movie: {movieNumber}</div>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <div>Selected</div>
                        <div className='seat selected-example m-2'></div>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <div>Occupied</div>
                        <div className='seat occupied-example m-2'></div>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <div>Reserved</div>
                        <div className='seat reserved-example m-2'></div>
                    </div>
                    <div className='text-white d-flex flex-column align-items-center mt-5'>
                        <div className='fs-6 text-center'>Selected Tickets</div>
                        <div className='fs-4 fw-semibold'>{numberOfTickets + '/' + selectedTickets}</div>
                    </div>
                </div>

                <div className='d-flex justify-content-center col-11'>
                    <div className='text-dark fw-bold fs-6 d-flex flex-column justify-content-end me-2'>
                        <div className='aud-row'>A</div>
                        <div className='aud-row'>B</div>
                        <div className='aud-row'>C</div>
                        <div className='aud-row'>D</div>
                        <div className='aud-row'>E</div>
                        <div className='aud-row'>F</div>
                        <div className='aud-row'>G</div>
                        <div className='aud-row'>H</div>
                        <div className='aud-row'>I</div>
                        <div className='aud-row'>J</div>
                        <div className='d-flex flex-column mt-4'>
                            <div className='aud-row'>K</div>
                            <div className='aud-row'>L</div>
                            <div className='aud-row'>M</div>
                            <div className='aud-row'>N</div>
                            <div className='aud-row'>O</div>
                            <div className='aud-row'>P</div>
                            <div className='aud-row'>Q</div>
                            <div className='aud-row'>R</div>
                            <div className='aud-row'>S</div>
                            <div className='aud-row'>T</div>
                        </div>
                    </div>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <div className='screen d-flex m-4'></div>
                        <div className="auditorium d-flex flex-column align-items-center">
                            <div className='d-flex mb-4'>
                                <div className="sector me-3">
                                    <div className='d-flex justify-content-end'>
                                        <div className='seat' data-value={'A/L1'} onClick={(e) => setClicked(e)}>1</div>
                                        <div className='seat' data-value={'A/L2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'A/L3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'A/L4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'A/L5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'A/L6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'A/L7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'A/L8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'A/L9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'A/L10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'A/L11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'A/L12'} onClick={(e) => setClicked(e)}>12</div>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <div className='seat' data-value={'B/L1'} onClick={(e) => setClicked(e)}>1</div>
                                        <div className='seat' data-value={'B/L2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'B/L3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'B/L4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'B/L5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'B/L6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'B/L7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'B/L8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'B/L9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'B/L10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'B/L11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'B/L12'} onClick={(e) => setClicked(e)}>12</div>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <div className='seat' data-value={'C/L1'} onClick={(e) => setClicked(e)}>1</div>
                                        <div className='seat' data-value={'C/L2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'C/L3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'C/L4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'C/L5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'C/L6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'C/L7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'C/L8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'C/L9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'C/L10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'C/L11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'C/L12'} onClick={(e) => setClicked(e)}>12</div>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <div className='seat' data-value={'D/L1'} onClick={(e) => setClicked(e)}>1</div>
                                        <div className='seat' data-value={'D/L2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'D/L3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'D/L4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'D/L5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'D/L6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'D/L7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'D/L8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'D/L9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'D/L10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'D/L11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'D/L12'} onClick={(e) => setClicked(e)}>12</div>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <div className='seat' data-value={'E/L1'} onClick={(e) => setClicked(e)}>1</div>
                                        <div className='seat' data-value={'E/L2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'E/L3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'E/L4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'E/L5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'E/L6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'E/L7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'E/L8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'E/L9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'E/L10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'E/L11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'E/L12'} onClick={(e) => setClicked(e)}>12</div>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <div className='seat' data-value={'F/L1'} onClick={(e) => setClicked(e)}>1</div>
                                        <div className='seat' data-value={'F/L2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'F/L3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'F/L4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'F/L5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'F/L6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'F/L7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'F/L8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'F/L9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'F/L10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'F/L11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'F/L12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'F/L13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'F/L14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'F/L15'} onClick={(e) => setClicked(e)}>15</div>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <div className='seat' data-value={'G/L1'} onClick={(e) => setClicked(e)}>1</div>
                                        <div className='seat' data-value={'G/L2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'G/L3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'G/L4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'G/L5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'G/L6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'G/L7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'G/L8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'G/L9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'G/L10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'G/L11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'G/L12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'G/L13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'G/L14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'G/L15'} onClick={(e) => setClicked(e)}>15</div>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <div className='seat' data-value={'H/L1'} onClick={(e) => setClicked(e)}>1</div>
                                        <div className='seat' data-value={'H/L2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'H/L3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'H/L4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'H/L5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'H/L6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'H/L7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'H/L8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'H/L9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'H/L10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'H/L11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'H/L12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'H/L13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'H/L14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'H/L15'} onClick={(e) => setClicked(e)}>15</div>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <div className='seat' data-value={'I/L1'} onClick={(e) => setClicked(e)}>1</div>
                                        <div className='seat' data-value={'I/L2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'I/L3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'I/L4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'I/L5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'I/L6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'I/L7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'I/L8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'I/L9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'I/L10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'I/L11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'I/L12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'I/L13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'I/L14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'I/L15'} onClick={(e) => setClicked(e)}>15</div>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <div className='seat' data-value={'J/L1'} onClick={(e) => setClicked(e)}>1</div>
                                        <div className='seat' data-value={'J/L2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'J/L3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'J/L4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'J/L5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'J/L6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'J/L7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'J/L8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'J/L9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'J/L10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'J/L11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'J/L12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'J/L13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'J/L14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'J/L15'} onClick={(e) => setClicked(e)}>15</div>
                                    </div>
                                </div>
                                <div className="sector ms-3">
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'A/R12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'A/R11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'A/R10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'A/R9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'A/R8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'A/R7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'A/R6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'A/R5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'A/R4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'A/R3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'A/R2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'A/R1'} onClick={(e) => setClicked(e)}>1</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'B/R12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'B/R11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'B/R10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'B/R9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'B/R8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'B/R7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'B/R6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'B/R5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'B/R4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'B/R3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'B/R2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'B/R1'} onClick={(e) => setClicked(e)}>1</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'C/R12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'C/R11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'C/R10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'C/R9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'C/R8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'C/R7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'C/R6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'C/R5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'C/R4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'C/R3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'C/R2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'C/R1'} onClick={(e) => setClicked(e)}>1</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'D/R12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'D/R11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'D/R10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'D/R9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'D/R8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'D/R7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'D/R6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'D/R5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'D/R4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'D/R3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'D/R2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'D/R1'} onClick={(e) => setClicked(e)}>1</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'E/R12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'E/R11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'E/R10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'E/R9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'E/R8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'E/R7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'E/R6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'E/R5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'E/R4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'E/R3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'E/R2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'E/R1'} onClick={(e) => setClicked(e)}>1</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'F/R15'} onClick={(e) => setClicked(e)}>15</div>
                                        <div className='seat' data-value={'F/R14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'F/R13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'F/R12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'F/R11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'F/R10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'F/R9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'F/R8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'F/R7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'F/R6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'F/R5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'F/R4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'F/R3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'F/R2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'F/R1'} onClick={(e) => setClicked(e)}>1</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'G/R15'} onClick={(e) => setClicked(e)}>15</div>
                                        <div className='seat' data-value={'G/R14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'G/R13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'G/R12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'G/R11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'G/R10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'G/R9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'G/R8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'G/R7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'G/R6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'G/R5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'G/R4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'G/R3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'G/R2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'G/R1'} onClick={(e) => setClicked(e)}>1</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'H/R15'} onClick={(e) => setClicked(e)}>15</div>
                                        <div className='seat' data-value={'H/R14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'H/R13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'H/R12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'H/R11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'H/R10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'H/R9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'H/R8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'H/R7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'H/R6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'H/R5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'H/R4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'H/R3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'H/R2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'H/R1'} onClick={(e) => setClicked(e)}>1</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'I/R15'} onClick={(e) => setClicked(e)}>15</div>
                                        <div className='seat' data-value={'I/R14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'I/R13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'I/R12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'I/R11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'I/R10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'I/R9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'I/R8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'I/R7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'I/R6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'I/R5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'I/R4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'I/R3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'I/R2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'I/R1'} onClick={(e) => setClicked(e)}>1</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'J/R15'} onClick={(e) => setClicked(e)}>15</div>
                                        <div className='seat' data-value={'J/R14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'J/R13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'J/R12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'J/R11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'J/R10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'J/R9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'J/R8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'J/R7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'J/R6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'J/R5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'J/R4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'J/R3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'J/R2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'J/R1'} onClick={(e) => setClicked(e)}>1</div>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex'>
                                <div className="sector me-3">
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'K/L1'} onClick={(e) => setClicked(e)}>1</div>
                                        <div className='seat' data-value={'K/L2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'K/L3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'K/L4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'K/L5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'K/L6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'K/L7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'K/L8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'K/L9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'K/L10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'K/L11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'K/L12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'K/L13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'K/L14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'K/L15'} onClick={(e) => setClicked(e)}>15</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'L/L1'} onClick={(e) => setClicked(e)}>1</div>
                                        <div className='seat' data-value={'L/L2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'L/L3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'L/L4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'L/L5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'L/L6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'L/L7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'L/L8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'L/L9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'L/L10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'L/L11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'L/L12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'L/L13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'L/L14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'L/L15'} onClick={(e) => setClicked(e)}>15</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'M/L1'} onClick={(e) => setClicked(e)}>1</div>
                                        <div className='seat' data-value={'M/L2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'M/L3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'M/L4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'M/L5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'M/L6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'M/L7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'M/L8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'M/L9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'M/L10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'M/L11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'M/L12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'M/L13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'M/L14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'M/L15'} onClick={(e) => setClicked(e)}>15</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'N/L1'} onClick={(e) => setClicked(e)}>1</div>
                                        <div className='seat' data-value={'N/L2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'N/L3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'N/L4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'N/L5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'N/L6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'N/L7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'N/L8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'N/L9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'N/L10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'N/L11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'N/L12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'N/L13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'N/L14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'N/L15'} onClick={(e) => setClicked(e)}>15</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'O/L1'} onClick={(e) => setClicked(e)}>1</div>
                                        <div className='seat' data-value={'O/L2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'O/L3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'O/L4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'O/L5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'O/L6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'O/L7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'O/L8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'O/L9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'O/L10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'O/L11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'O/L12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'O/L13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'O/L14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'O/L15'} onClick={(e) => setClicked(e)}>15</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'P/L1'} onClick={(e) => setClicked(e)}>1</div>
                                        <div className='seat' data-value={'P/L2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'P/L3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'P/L4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'P/L5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'P/L6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'P/L7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'P/L8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'P/L9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'P/L10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'P/L11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'P/L12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'P/L13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'P/L14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'P/L15'} onClick={(e) => setClicked(e)}>15</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'Q/L1'} onClick={(e) => setClicked(e)}>1</div>
                                        <div className='seat' data-value={'Q/L2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'Q/L3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'Q/L4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'Q/L5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'Q/L6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'Q/L7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'Q/L8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'Q/L9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'Q/L10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'Q/L11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'Q/L12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'Q/L13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'Q/L14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'Q/L15'} onClick={(e) => setClicked(e)}>15</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'R/L1'} onClick={(e) => setClicked(e)}>1</div>
                                        <div className='seat' data-value={'R/L2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'R/L3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'R/L4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'R/L5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'R/L6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'R/L7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'R/L8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'R/L9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'R/L10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'R/L11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'R/L12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'R/L13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'R/L14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'R/L15'} onClick={(e) => setClicked(e)}>15</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'S/L1'} onClick={(e) => setClicked(e)}>1</div>
                                        <div className='seat' data-value={'S/L2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'S/L3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'S/L4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'S/L5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'S/L6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'S/L7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'S/L8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'S/L9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'S/L10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'S/L11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'S/L12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'S/L13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'S/L14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'S/L15'} onClick={(e) => setClicked(e)}>15</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'T/L1'} onClick={(e) => setClicked(e)}>1</div>
                                        <div className='seat' data-value={'T/L2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'T/L3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'T/L4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'T/L5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'T/L6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'T/L7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'T/L8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'T/L9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'T/L10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'T/L11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'T/L12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'T/L13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'T/L14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'T/L15'} onClick={(e) => setClicked(e)}>15</div>
                                    </div>
                                </div>
                                <div className="sector ms-3">
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'K/R15'} onClick={(e) => setClicked(e)}>15</div>
                                        <div className='seat' data-value={'K/R14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'K/R13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'K/R12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'K/R11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'K/R10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'K/R9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'K/R8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'K/R7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'K/R6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'K/R5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'K/R4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'K/R3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'K/R2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'K/R1'} onClick={(e) => setClicked(e)}>1</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'L/R15'} onClick={(e) => setClicked(e)}>15</div>
                                        <div className='seat' data-value={'L/R14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'L/R13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'L/R12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'L/R11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'L/R10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'L/R9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'L/R8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'L/R7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'L/R6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'L/R5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'L/R4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'L/R3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'L/R2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'L/R1'} onClick={(e) => setClicked(e)}>1</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'M/R15'} onClick={(e) => setClicked(e)}>15</div>
                                        <div className='seat' data-value={'M/R14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'M/R13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'M/R12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'M/R11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'M/R10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'M/R9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'M/R8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'M/R7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'M/R6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'M/R5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'M/R4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'M/R3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'M/R2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'M/R1'} onClick={(e) => setClicked(e)}>1</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'N/R15'} onClick={(e) => setClicked(e)}>15</div>
                                        <div className='seat' data-value={'N/R14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'N/R13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'N/R12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'N/R11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'N/R10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'N/R9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'N/R8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'N/R7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'N/R6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'N/R5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'N/R4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'N/R3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'N/R2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'N/R1'} onClick={(e) => setClicked(e)}>1</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'O/R15'} onClick={(e) => setClicked(e)}>15</div>
                                        <div className='seat' data-value={'O/R14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'O/R13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'O/R12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'O/R11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'O/R10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'O/R9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'O/R8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'O/R7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'O/R6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'O/R5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'O/R4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'O/R3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'O/R2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'O/R1'} onClick={(e) => setClicked(e)}>1</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'P/R15'} onClick={(e) => setClicked(e)}>15</div>
                                        <div className='seat' data-value={'P/R14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'P/R13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'P/R12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'P/R11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'P/R10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'P/R9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'P/R8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'P/R7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'P/R6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'P/R5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'P/R4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'P/R3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'P/R2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'P/R1'} onClick={(e) => setClicked(e)}>1</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'Q/R15'} onClick={(e) => setClicked(e)}>15</div>
                                        <div className='seat' data-value={'Q/R14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'Q/R13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'Q/R12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'Q/R11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'Q/R10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'Q/R9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'Q/R8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'Q/R7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'Q/R6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'Q/R5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'Q/R4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'Q/R3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'Q/R2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'Q/R1'} onClick={(e) => setClicked(e)}>1</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'R/R15'} onClick={(e) => setClicked(e)}>15</div>
                                        <div className='seat' data-value={'R/R14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'R/R13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'R/R12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'R/R11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'R/R10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'R/R9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'R/R8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'R/R7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'R/R6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'R/R5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'R/R4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'R/R3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'R/R2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'R/R1'} onClick={(e) => setClicked(e)}>1</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'S/R15'} onClick={(e) => setClicked(e)}>15</div>
                                        <div className='seat' data-value={'S/R14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'S/R13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'S/R12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'S/R11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'S/R10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'S/R9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'S/R8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'S/R7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'S/R6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'S/R5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'S/R4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'S/R3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'S/R2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'S/R1'} onClick={(e) => setClicked(e)}>1</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='seat' data-value={'T/R15'} onClick={(e) => setClicked(e)}>15</div>
                                        <div className='seat' data-value={'T/R14'} onClick={(e) => setClicked(e)}>14</div>
                                        <div className='seat' data-value={'T/R13'} onClick={(e) => setClicked(e)}>13</div>
                                        <div className='seat' data-value={'T/R12'} onClick={(e) => setClicked(e)}>12</div>
                                        <div className='seat' data-value={'T/R11'} onClick={(e) => setClicked(e)}>11</div>
                                        <div className='seat' data-value={'T/R10'} onClick={(e) => setClicked(e)}>10</div>
                                        <div className='seat' data-value={'T/R9'} onClick={(e) => setClicked(e)}>9</div>
                                        <div className='seat' data-value={'T/R8'} onClick={(e) => setClicked(e)}>8</div>
                                        <div className='seat' data-value={'T/R7'} onClick={(e) => setClicked(e)}>7</div>
                                        <div className='seat' data-value={'T/R6'} onClick={(e) => setClicked(e)}>6</div>
                                        <div className='seat' data-value={'T/R5'} onClick={(e) => setClicked(e)}>5</div>
                                        <div className='seat' data-value={'T/R4'} onClick={(e) => setClicked(e)}>4</div>
                                        <div className='seat' data-value={'T/R3'} onClick={(e) => setClicked(e)}>3</div>
                                        <div className='seat' data-value={'T/R2'} onClick={(e) => setClicked(e)}>2</div>
                                        <div className='seat' data-value={'T/R1'} onClick={(e) => setClicked(e)}>1</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TicketMenu back={() => setCurrentAud(0)} tickets={tickets} onClick={(e) => genericHandleTicketClicked(e)}/>
        </>
    )
}

export default Auditorium_1

