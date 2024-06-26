import React, { useEffect, useState } from 'react'
import TicketMenu from '../TicketMenu';
import { HandleItemClicked, SaveTickets } from '../../calculator';
import { Modal } from 'react-bootstrap';

const Auditorium_2 = ({ isLoading, setTransactionPossible, ticketBasket, paymentMethod, movieNumber, currentAud, tickets, setCurrentAud, transactionInprogress, setTransactionInprogress, setPaymentMethod, setTicketClicked, setTicketIsClicked, setTicketBasket, setDisplayTransaction, setPrice, setAmountReceived, setChange, setBanknoteWasClicked }) => {

    const seats = document.querySelectorAll('.seat');
    const [numberOfTickets, setNumberOfTickets] = useState(0);
    const [selectedTickets, setSelectedTickets] = useState(0);

    const [soldSeats, setSoldSeats] = useState([]);
    const screeningId = `auditorium_${currentAud}_movie_${movieNumber}`;
    const [savedSeats, setSavedSeats] = useState(() => JSON.parse(localStorage.getItem(`auditorium_${currentAud}_movie_${movieNumber}`)) || []);
    const [seatsLoaded, setSeatsLoaded] = useState(false);

    const reservationId = `auditorium_${currentAud}_movie_${movieNumber}_reservation`;
    const [reservationInProg, setReservationInProg] = useState(false);
    const [savingReservations, setSavingReservations] = useState(false);
    const [newReservations, setNewReservations] = useState([]);
    const [savedReservations, setSavedReservations] = useState(() => JSON.parse(localStorage.getItem(`auditorium_${currentAud}_movie_${movieNumber}_reservation`)) || []);

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
        setNewReservations([]);
    }

    useEffect(() => {
        if (numberOfTickets === selectedTickets && numberOfTickets > 0 && selectedTickets > 0) {
            setTransactionPossible(true);
        } else {
            setTransactionPossible(false);
        }
    },[numberOfTickets, selectedTickets]);

    useEffect(() => {
        console.log('tranInProg: ' + transactionInprogress);
        console.log('savingRes: ' + savingReservations);
    });

    useEffect(() => {
        setSeatsLoaded(true);
        seats.forEach((seat) => {
            const seatValue = seat.getAttribute('data-value');
            if (savedSeats.includes(seatValue)) {
                seat.classList.add('occupied');
                seat.classList.add('sold');
            }
        })
        savedReservations.forEach((reservation) => {
            reservation.forEach((reservedSeat) => {
                seats.forEach((seat) => {
                    const seatValue = seat.getAttribute('data-value');
                    if (reservedSeat === seatValue) {
                        seat.classList.add('reserved');
                        seat.classList.add('saved');
                    }
                });
            });
        });
    },[screeningId, savedSeats, seats, seatsLoaded, savedReservations]);

    useEffect(() => {
        localStorage.setItem(screeningId, JSON.stringify(savedSeats));
        localStorage.setItem(reservationId, JSON.stringify(savedReservations));
    },[savedReservations, savedSeats, savingReservations]);

    useEffect(() => {
        const totalTickets = ticketBasket.reduce((total, ticket) => total + ticket.amount, 0);
        setNumberOfTickets(totalTickets);
    }, [ticketBasket]);

    function seatClicked(e) {
        const seatValue = e.target.getAttribute('data-value');
        console.log('seat clicked: ', seatValue);
        if (transactionInprogress) {
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
        if (!transactionInprogress) {
            setReservationInProg(true);
            if (!e.target.classList.contains('sold') && !e.target.classList.contains('reserved') && !e.target.classList.contains('saved')) {
                e.target.classList.toggle('reserved');
                setNewReservations((prevRev) => [...prevRev, seatValue]);
            } else if(e.target.classList.contains('reserved') && !e.target.classList.contains('saved')){
                e.target.classList.remove('reserved');
                setNewReservations((prevRev) => prevRev.filter((seat) => seat !== seatValue));
            }
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

    useEffect(() => {
        if (selectedTickets > 0 || numberOfTickets > 0) {
            seats.forEach((seat) => {
                if (seat.classList.contains('reserved') && !seat.classList.contains('saved')) {
                    seat.classList.remove('reserved');
                }
            });
        }
        if (savingReservations) {
            console.log('SAVING');
            setSavedReservations(prev => [...prev, newReservations]);
            setSavingReservations(false);
        }
    },[selectedTickets, numberOfTickets, savingReservations, newReservations]);

    function genericHandleTicketClicked(newTicket) {
        console.log('ticket clicked: ' + newTicket.category)
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
        console.log('HandleItemClicked()');
        setNewReservations([]);
    }

    function handleSavingReservations() {
        setSavingReservations(true);
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
                        <div className='d-flex flex-column mt-4'>
                            <div className='aud-row'>H</div>
                            <div className='aud-row'>I</div>
                            <div className='aud-row'>J</div>
                            <div className='aud-row'>K</div>
                        </div>
                    </div>

                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <div className='screen shadow-lg'></div>
                        <div className="sector mb-4">
                            <div className='d-flex justify-content-center'>
                                <div className='seat'  data-value={'A/1'} onClick={(e) => seatClicked(e)}>1</div>
                                <div className='seat'  data-value={'A/2'} onClick={(e) => seatClicked(e)}>2</div>
                                <div className='seat'  data-value={'A/3'} onClick={(e) => seatClicked(e)}>3</div>
                                <div className='seat'  data-value={'A/4'} onClick={(e) => seatClicked(e)}>4</div>
                                <div className='seat'  data-value={'A/5'} onClick={(e) => seatClicked(e)}>5</div>
                                <div className='seat'  data-value={'A/6'} onClick={(e) => seatClicked(e)}>6</div>
                                <div className='seat'  data-value={'A/7'} onClick={(e) => seatClicked(e)}>7</div>
                                <div className='seat'  data-value={'A/8'} onClick={(e) => seatClicked(e)}>8</div>
                                <div className='seat'  data-value={'A/9'} onClick={(e) => seatClicked(e)}>9</div>
                                <div className='seat'  data-value={'A/10'} onClick={(e) => seatClicked(e)}>10</div>
                                <div className='seat'  data-value={'A/11'} onClick={(e) => seatClicked(e)}>11</div>
                                <div className='seat'  data-value={'A/12'} onClick={(e) => seatClicked(e)}>12</div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className='seat'  data-value={'B/1'} onClick={(e) => seatClicked(e)}>1</div>
                                <div className='seat'  data-value={'B/2'} onClick={(e) => seatClicked(e)}>2</div>
                                <div className='seat'  data-value={'B/3'} onClick={(e) => seatClicked(e)}>3</div>
                                <div className='seat'  data-value={'B/4'} onClick={(e) => seatClicked(e)}>4</div>
                                <div className='seat'  data-value={'B/5'} onClick={(e) => seatClicked(e)}>5</div>
                                <div className='seat'  data-value={'B/6'} onClick={(e) => seatClicked(e)}>6</div>
                                <div className='seat'  data-value={'B/7'} onClick={(e) => seatClicked(e)}>7</div>
                                <div className='seat'  data-value={'B/8'} onClick={(e) => seatClicked(e)}>8</div>
                                <div className='seat'  data-value={'B/9'} onClick={(e) => seatClicked(e)}>9</div>
                                <div className='seat'  data-value={'B/10'} onClick={(e) => seatClicked(e)}>10</div>
                                <div className='seat'  data-value={'B/11'} onClick={(e) => seatClicked(e)}>11</div>
                                <div className='seat'  data-value={'B/12'} onClick={(e) => seatClicked(e)}>12</div>
                                <div className='seat'  data-value={'B/13'} onClick={(e) => seatClicked(e)}>13</div>
                                <div className='seat'  data-value={'B/14'} onClick={(e) => seatClicked(e)}>14</div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className='seat'  data-value={'C/1'} onClick={(e) => seatClicked(e)}>1</div>
                                <div className='seat'  data-value={'C/2'} onClick={(e) => seatClicked(e)}>2</div>
                                <div className='seat'  data-value={'C/3'} onClick={(e) => seatClicked(e)}>3</div>
                                <div className='seat'  data-value={'C/4'} onClick={(e) => seatClicked(e)}>4</div>
                                <div className='seat'  data-value={'C/5'} onClick={(e) => seatClicked(e)}>5</div>
                                <div className='seat'  data-value={'C/6'} onClick={(e) => seatClicked(e)}>6</div>
                                <div className='seat'  data-value={'C/7'} onClick={(e) => seatClicked(e)}>7</div>
                                <div className='seat'  data-value={'C/8'} onClick={(e) => seatClicked(e)}>8</div>
                                <div className='seat'  data-value={'C/9'} onClick={(e) => seatClicked(e)}>9</div>
                                <div className='seat'  data-value={'C/10'} onClick={(e) => seatClicked(e)}>10</div>
                                <div className='seat'  data-value={'C/11'} onClick={(e) => seatClicked(e)}>11</div>
                                <div className='seat'  data-value={'C/12'} onClick={(e) => seatClicked(e)}>12</div>
                                <div className='seat'  data-value={'C/13'} onClick={(e) => seatClicked(e)}>13</div>
                                <div className='seat'  data-value={'C/14'} onClick={(e) => seatClicked(e)}>14</div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className='seat'  data-value={'D/1'} onClick={(e) => seatClicked(e)}>1</div>
                                <div className='seat'  data-value={'D/2'} onClick={(e) => seatClicked(e)}>2</div>
                                <div className='seat'  data-value={'D/3'} onClick={(e) => seatClicked(e)}>3</div>
                                <div className='seat'  data-value={'D/4'} onClick={(e) => seatClicked(e)}>4</div>
                                <div className='seat'  data-value={'D/5'} onClick={(e) => seatClicked(e)}>5</div>
                                <div className='seat'  data-value={'D/6'} onClick={(e) => seatClicked(e)}>6</div>
                                <div className='seat'  data-value={'D/7'} onClick={(e) => seatClicked(e)}>7</div>
                                <div className='seat'  data-value={'D/8'} onClick={(e) => seatClicked(e)}>8</div>
                                <div className='seat'  data-value={'D/9'} onClick={(e) => seatClicked(e)}>9</div>
                                <div className='seat'  data-value={'D/10'} onClick={(e) => seatClicked(e)}>10</div>
                                <div className='seat'  data-value={'D/11'} onClick={(e) => seatClicked(e)}>11</div>
                                <div className='seat'  data-value={'D/12'} onClick={(e) => seatClicked(e)}>12</div>
                                <div className='seat'  data-value={'D/13'} onClick={(e) => seatClicked(e)}>13</div>
                                <div className='seat'  data-value={'D/14'} onClick={(e) => seatClicked(e)}>14</div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className='seat'  data-value={'E/1'} onClick={(e) => seatClicked(e)}>1</div>
                                <div className='seat'  data-value={'E/2'} onClick={(e) => seatClicked(e)}>2</div>
                                <div className='seat'  data-value={'E/3'} onClick={(e) => seatClicked(e)}>3</div>
                                <div className='seat'  data-value={'E/4'} onClick={(e) => seatClicked(e)}>4</div>
                                <div className='seat'  data-value={'E/5'} onClick={(e) => seatClicked(e)}>5</div>
                                <div className='seat'  data-value={'E/6'} onClick={(e) => seatClicked(e)}>6</div>
                                <div className='seat'  data-value={'E/7'} onClick={(e) => seatClicked(e)}>7</div>
                                <div className='seat'  data-value={'E/8'} onClick={(e) => seatClicked(e)}>8</div>
                                <div className='seat'  data-value={'E/9'} onClick={(e) => seatClicked(e)}>9</div>
                                <div className='seat'  data-value={'E/10'} onClick={(e) => seatClicked(e)}>10</div>
                                <div className='seat'  data-value={'E/11'} onClick={(e) => seatClicked(e)}>11</div>
                                <div className='seat'  data-value={'E/12'} onClick={(e) => seatClicked(e)}>12</div>
                                <div className='seat'  data-value={'E/13'} onClick={(e) => seatClicked(e)}>13</div>
                                <div className='seat'  data-value={'E/14'} onClick={(e) => seatClicked(e)}>14</div>
                                <div className='seat'  data-value={'E/13'} onClick={(e) => seatClicked(e)}>15</div>
                                <div className='seat'  data-value={'E/14'} onClick={(e) => seatClicked(e)}>16</div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className='seat'  data-value={'F/1'} onClick={(e) => seatClicked(e)}>1</div>
                                <div className='seat'  data-value={'F/2'} onClick={(e) => seatClicked(e)}>2</div>
                                <div className='seat'  data-value={'F/3'} onClick={(e) => seatClicked(e)}>3</div>
                                <div className='seat'  data-value={'F/4'} onClick={(e) => seatClicked(e)}>4</div>
                                <div className='seat'  data-value={'F/5'} onClick={(e) => seatClicked(e)}>5</div>
                                <div className='seat'  data-value={'F/6'} onClick={(e) => seatClicked(e)}>6</div>
                                <div className='seat'  data-value={'F/7'} onClick={(e) => seatClicked(e)}>7</div>
                                <div className='seat'  data-value={'F/8'} onClick={(e) => seatClicked(e)}>8</div>
                                <div className='seat'  data-value={'F/9'} onClick={(e) => seatClicked(e)}>9</div>
                                <div className='seat'  data-value={'F/10'} onClick={(e) => seatClicked(e)}>10</div>
                                <div className='seat'  data-value={'F/11'} onClick={(e) => seatClicked(e)}>11</div>
                                <div className='seat'  data-value={'F/12'} onClick={(e) => seatClicked(e)}>12</div>
                                <div className='seat'  data-value={'F/13'} onClick={(e) => seatClicked(e)}>13</div>
                                <div className='seat'  data-value={'F/14'} onClick={(e) => seatClicked(e)}>14</div>
                                <div className='seat'  data-value={'F/13'} onClick={(e) => seatClicked(e)}>15</div>
                                <div className='seat'  data-value={'F/14'} onClick={(e) => seatClicked(e)}>16</div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className='seat'  data-value={'G/1'} onClick={(e) => seatClicked(e)}>1</div>
                                <div className='seat'  data-value={'G/2'} onClick={(e) => seatClicked(e)}>2</div>
                                <div className='seat'  data-value={'G/3'} onClick={(e) => seatClicked(e)}>3</div>
                                <div className='seat'  data-value={'G/4'} onClick={(e) => seatClicked(e)}>4</div>
                                <div className='seat'  data-value={'G/5'} onClick={(e) => seatClicked(e)}>5</div>
                                <div className='seat'  data-value={'G/6'} onClick={(e) => seatClicked(e)}>6</div>
                                <div className='seat'  data-value={'G/7'} onClick={(e) => seatClicked(e)}>7</div>
                                <div className='seat'  data-value={'G/8'} onClick={(e) => seatClicked(e)}>8</div>
                                <div className='seat'  data-value={'G/9'} onClick={(e) => seatClicked(e)}>9</div>
                                <div className='seat'  data-value={'G/10'} onClick={(e) => seatClicked(e)}>10</div>
                                <div className='seat'  data-value={'G/11'} onClick={(e) => seatClicked(e)}>11</div>
                                <div className='seat'  data-value={'G/12'} onClick={(e) => seatClicked(e)}>12</div>
                                <div className='seat'  data-value={'G/13'} onClick={(e) => seatClicked(e)}>13</div>
                                <div className='seat'  data-value={'G/14'} onClick={(e) => seatClicked(e)}>14</div>
                                <div className='seat'  data-value={'G/13'} onClick={(e) => seatClicked(e)}>15</div>
                                <div className='seat'  data-value={'G/14'} onClick={(e) => seatClicked(e)}>16</div>
                            </div>
                        </div>
                        <div className="sector">
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex'>
                                    <div className='seat'  data-value={'H/L3'} onClick={(e) => seatClicked(e)}>3</div>
                                    <div className='seat'  data-value={'H/L3'} onClick={(e) => seatClicked(e)}>2</div>
                                    <div className='seat'  data-value={'H/L3'} onClick={(e) => seatClicked(e)}>1</div>
                                </div>
                                <div className='d-flex'>
                                    <div className='seat'  data-value={'H/C1'} onClick={(e) => seatClicked(e)}>1</div>
                                    <div className='seat'  data-value={'H/C2'} onClick={(e) => seatClicked(e)}>2</div>
                                    <div className='seat'  data-value={'H/C3'} onClick={(e) => seatClicked(e)}>3</div>
                                    <div className='seat'  data-value={'H/C4'} onClick={(e) => seatClicked(e)}>4</div>
                                    <div className='seat'  data-value={'H/C5'} onClick={(e) => seatClicked(e)}>5</div>
                                    <div className='seat'  data-value={'H/C6'} onClick={(e) => seatClicked(e)}>6</div>
                                    <div className='seat'  data-value={'H/C7'} onClick={(e) => seatClicked(e)}>7</div>
                                    <div className='seat'  data-value={'H/C8'} onClick={(e) => seatClicked(e)}>8</div>
                                    <div className='seat'  data-value={'H/C9'} onClick={(e) => seatClicked(e)}>9</div>
                                    <div className='seat'  data-value={'H/C10'} onClick={(e) => seatClicked(e)}>10</div>
                                    <div className='seat'  data-value={'H/C11'} onClick={(e) => seatClicked(e)}>11</div>
                                    <div className='seat'  data-value={'H/C12'} onClick={(e) => seatClicked(e)}>12</div>
                                    <div className='seat'  data-value={'H/C13'} onClick={(e) => seatClicked(e)}>13</div>
                                    <div className='seat'  data-value={'H/C14'} onClick={(e) => seatClicked(e)}>14</div>
                                    <div className='seat'  data-value={'H/C15'} onClick={(e) => seatClicked(e)}>15</div>
                                    <div className='seat'  data-value={'H/C16'} onClick={(e) => seatClicked(e)}>16</div>
                                </div>
                                <div className='d-flex'>
                                    <div className='seat'  data-value={'H/R1'} onClick={(e) => seatClicked(e)}>1</div>
                                    <div className='seat'  data-value={'H/R2'} onClick={(e) => seatClicked(e)}>2</div>
                                    <div className='seat'  data-value={'H/R3'} onClick={(e) => seatClicked(e)}>3</div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex'>
                                    <div className='seat'  data-value={'I/L3'} onClick={(e) => seatClicked(e)}>3</div>
                                    <div className='seat'  data-value={'I/L3'} onClick={(e) => seatClicked(e)}>2</div>
                                    <div className='seat'  data-value={'I/L3'} onClick={(e) => seatClicked(e)}>1</div>
                                </div>
                                <div className='d-flex'>
                                    <div className='seat'  data-value={'I/C1'} onClick={(e) => seatClicked(e)}>1</div>
                                    <div className='seat'  data-value={'I/C2'} onClick={(e) => seatClicked(e)}>2</div>
                                    <div className='seat'  data-value={'I/C3'} onClick={(e) => seatClicked(e)}>3</div>
                                    <div className='seat'  data-value={'I/C4'} onClick={(e) => seatClicked(e)}>4</div>
                                    <div className='seat'  data-value={'I/C5'} onClick={(e) => seatClicked(e)}>5</div>
                                    <div className='seat'  data-value={'I/C6'} onClick={(e) => seatClicked(e)}>6</div>
                                    <div className='seat'  data-value={'I/C7'} onClick={(e) => seatClicked(e)}>7</div>
                                    <div className='seat'  data-value={'I/C8'} onClick={(e) => seatClicked(e)}>8</div>
                                    <div className='seat'  data-value={'I/C9'} onClick={(e) => seatClicked(e)}>9</div>
                                    <div className='seat'  data-value={'I/C10'} onClick={(e) => seatClicked(e)}>10</div>
                                    <div className='seat'  data-value={'I/C11'} onClick={(e) => seatClicked(e)}>11</div>
                                    <div className='seat'  data-value={'I/C12'} onClick={(e) => seatClicked(e)}>12</div>
                                    <div className='seat'  data-value={'I/C13'} onClick={(e) => seatClicked(e)}>13</div>
                                    <div className='seat'  data-value={'I/C14'} onClick={(e) => seatClicked(e)}>14</div>
                                    <div className='seat'  data-value={'I/C15'} onClick={(e) => seatClicked(e)}>15</div>
                                    <div className='seat'  data-value={'I/C16'} onClick={(e) => seatClicked(e)}>16</div>
                                </div>
                                <div className='d-flex'>
                                    <div className='seat'  data-value={'I/R1'} onClick={(e) => seatClicked(e)}>1</div>
                                    <div className='seat'  data-value={'I/R2'} onClick={(e) => seatClicked(e)}>2</div>
                                    <div className='seat'  data-value={'I/R3'} onClick={(e) => seatClicked(e)}>3</div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex'>
                                    <div className='seat'  data-value={'J/L3'} onClick={(e) => seatClicked(e)}>3</div>
                                    <div className='seat'  data-value={'J/L3'} onClick={(e) => seatClicked(e)}>2</div>
                                    <div className='seat'  data-value={'J/L3'} onClick={(e) => seatClicked(e)}>1</div>
                                </div>
                                <div className='d-flex'>
                                    <div className='seat'  data-value={'J/C1'} onClick={(e) => seatClicked(e)}>1</div>
                                    <div className='seat'  data-value={'J/C2'} onClick={(e) => seatClicked(e)}>2</div>
                                    <div className='seat'  data-value={'J/C3'} onClick={(e) => seatClicked(e)}>3</div>
                                    <div className='seat'  data-value={'J/C4'} onClick={(e) => seatClicked(e)}>4</div>
                                    <div className='seat'  data-value={'J/C5'} onClick={(e) => seatClicked(e)}>5</div>
                                    <div className='seat'  data-value={'J/C6'} onClick={(e) => seatClicked(e)}>6</div>
                                    <div className='seat'  data-value={'J/C7'} onClick={(e) => seatClicked(e)}>7</div>
                                    <div className='seat'  data-value={'J/C8'} onClick={(e) => seatClicked(e)}>8</div>
                                    <div className='seat'  data-value={'J/C9'} onClick={(e) => seatClicked(e)}>9</div>
                                    <div className='seat'  data-value={'J/C10'} onClick={(e) => seatClicked(e)}>10</div>
                                    <div className='seat'  data-value={'J/C11'} onClick={(e) => seatClicked(e)}>11</div>
                                    <div className='seat'  data-value={'J/C12'} onClick={(e) => seatClicked(e)}>12</div>
                                    <div className='seat'  data-value={'J/C13'} onClick={(e) => seatClicked(e)}>13</div>
                                    <div className='seat'  data-value={'J/C14'} onClick={(e) => seatClicked(e)}>14</div>
                                    <div className='seat'  data-value={'J/C15'} onClick={(e) => seatClicked(e)}>15</div>
                                    <div className='seat'  data-value={'J/C16'} onClick={(e) => seatClicked(e)}>16</div>
                                </div>
                                <div className='d-flex'>
                                    <div className='seat'  data-value={'J/R1'} onClick={(e) => seatClicked(e)}>1</div>
                                    <div className='seat'  data-value={'J/R2'} onClick={(e) => seatClicked(e)}>2</div>
                                    <div className='seat'  data-value={'J/R3'} onClick={(e) => seatClicked(e)}>3</div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className='seat'  data-value={'K/L5'} onClick={(e) => seatClicked(e)}>5</div>
                                <div className='seat'  data-value={'K/L4'} onClick={(e) => seatClicked(e)}>4</div>
                                <div className='seat'  data-value={'K/L3'} onClick={(e) => seatClicked(e)}>3</div>
                                <div className='seat'  data-value={'K/L2'} onClick={(e) => seatClicked(e)}>2</div>
                                <div className='seat'  data-value={'K/L1'} onClick={(e) => seatClicked(e)}>1</div>
                                <div className='seat'  data-value={'K/C1'} onClick={(e) => seatClicked(e)}>1</div>
                                <div className='seat'  data-value={'K/C2'} onClick={(e) => seatClicked(e)}>2</div>
                                <div className='seat'  data-value={'K/C3'} onClick={(e) => seatClicked(e)}>3</div>
                                <div className='seat'  data-value={'K/C4'} onClick={(e) => seatClicked(e)}>4</div>
                                <div className='seat'  data-value={'K/C5'} onClick={(e) => seatClicked(e)}>5</div>
                                <div className='seat'  data-value={'K/C6'} onClick={(e) => seatClicked(e)}>6</div>
                                <div className='seat'  data-value={'K/C7'} onClick={(e) => seatClicked(e)}>7</div>
                                <div className='seat'  data-value={'K/C8'} onClick={(e) => seatClicked(e)}>8</div>
                                <div className='seat'  data-value={'K/C9'} onClick={(e) => seatClicked(e)}>9</div>
                                <div className='seat'  data-value={'K/C10'} onClick={(e) => seatClicked(e)}>10</div>
                                <div className='seat'  data-value={'K/C11'} onClick={(e) => seatClicked(e)}>11</div>
                                <div className='seat'  data-value={'K/C12'} onClick={(e) => seatClicked(e)}>12</div>
                                <div className='seat'  data-value={'K/C13'} onClick={(e) => seatClicked(e)}>13</div>
                                <div className='seat'  data-value={'K/C14'} onClick={(e) => seatClicked(e)}>14</div>
                                <div className='seat'  data-value={'K/C15'} onClick={(e) => seatClicked(e)}>15</div>
                                <div className='seat'  data-value={'K/C16'} onClick={(e) => seatClicked(e)}>16</div>
                                <div className='seat'  data-value={'K/R1'} onClick={(e) => seatClicked(e)}>1</div>
                                <div className='seat'  data-value={'K/R2'} onClick={(e) => seatClicked(e)}>2</div>
                                <div className='seat'  data-value={'K/R3'} onClick={(e) => seatClicked(e)}>3</div>
                                <div className='seat'  data-value={'K/R4'} onClick={(e) => seatClicked(e)}>4</div>
                                <div className='seat'  data-value={'K/R5'} onClick={(e) => seatClicked(e)}>5</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Reservation Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h5>Seats Reserved:</h5>
                        <ul className='list-group'>
                            {newReservations.map((reservation, index) => (
                                <li className='list-group-item' key={index}>{reservation}</li>
                            ))}
                        </ul>
                    </div>
                </Modal.Body>
            </Modal>
            <TicketMenu isLoading={isLoading} back={() => setCurrentAud(0)} tickets={tickets} onClick={(e) => genericHandleTicketClicked(e)} onClickReservation={() => {
                handleSavingReservations();
                setShowModal(true);
            }}/>
        </>
    )
}

export default Auditorium_2