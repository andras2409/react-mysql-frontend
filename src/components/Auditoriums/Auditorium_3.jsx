import React, { useEffect, useState } from 'react'
import TicketMenu from '../TicketMenu';
import { HandleItemClicked, SaveTickets } from '../../calculator';
import { Modal } from 'react-bootstrap';

const Auditorium_3 = ({ isLoading, setTransactionPossible, ticketBasket, paymentMethod, movieNumber, currentAud, tickets, setCurrentAud, transactionInprogress, setTransactionInprogress, setPaymentMethod, setTicketClicked, setTicketIsClicked, setTicketBasket, setDisplayTransaction, setPrice, setAmountReceived, setChange, setBanknoteWasClicked }) => {

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

                <div className='d-flex flex-column col-1'>
                    <div className='d-flex flex-column align-items-center'>
                        <div className='text-white'>Selected</div>
                        <div className='seat selected-example m-2'></div>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <div className='text-white'>Occupied</div>
                        <div className='seat occupied m-2'></div>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <div className='text-white'>Reserved</div>
                        <div className='seat reserved m-2'></div>
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
                    </div>
                    <div className='d-flex flex-column align-items-center col-11'>
                        <div className='screen shadow-lg d-flex'></div>
                        <div className='sector mb-4'>
                            <div className='d-flex justify-content-center'>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                            </div>
                        </div>
                        <div className='sector'>
                            <div className='d-flex justify-content-center'>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
                                <div className='seat'></div>
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

export default Auditorium_3