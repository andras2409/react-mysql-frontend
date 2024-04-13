import React from 'react'
import { useEffect, useState } from 'react'

const Auditorium_3 = ({ ticketBasket }) => {

    const [numberOfTickets, setNumberOfTickets] = useState(0);
    const [selectedTickets, setSelectedTickets] = useState(0);

    useEffect(() => {
        const totalTickets = ticketBasket.reduce((total, ticket) => total + ticket.amount, 0);
        setNumberOfTickets(totalTickets);
    }, [ticketBasket]);

    function setClicked(e) {
        if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved') && !e.target.classList.contains('occupied')  && !e.target.classList.contains('selected') && numberOfTickets > selectedTickets) {
            e.target.classList.toggle('selected');
            setSelectedTickets(selectedTickets + 1);
        } else if (e.target.classList.contains('seat') && e.target.classList.contains('selected')) {
            e.target.classList.remove('selected');
            setSelectedTickets(selectedTickets - 1);
        }
    }

    return (
        <div className='d-flex flex-fill justify-content-center align-items-center bg-dark'>

            <div className='d-flex flex-column col-1'>
                <div className='d-flex flex-column align-items-center'>
                    <div className='text-white'>Selected</div>
                    <div className='seat selected m-2'></div>
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
    )
}

export default Auditorium_3